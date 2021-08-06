import React, {useState, useEffect} from 'react';
import {Alert, View, Text, StyleSheet} from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import { TouchableOpacity } from 'react-native-gesture-handler';

const GoogleSignInPage = () => {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive', 
            'https://www.googleapis.com/auth/spreadsheets'],
            webClientId: '1022434323661-1s2e6gp6apflltb2ll7e9dnvq42tsnlu.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            loginHint: '',
            accountName: '',
            iosClientId: '1022434323661-1s2e6gp6apflltb2ll7e9dnvq42tsnlu.apps.googleusercontent.com'
        });
    }, []);

    const signIn = async () => {
        try{
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn()
            .then(data => {
                console.log(data);
                setUserInfo(data);
            });
        }
        catch (error) {
            if(error.code === statusCodes.SIGN_IN_CANCELLED){
                Alert('sign in cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS){
                Alert('sign in in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
                Alert('play services not available or outdated');
            } else {
                Alert('some other error happened')
            }
        }
    }

    const isSignedIn = async () => {
        console.log('isSignedIn')
        try{
            await GoogleSignin.isSignedIn()
            .then(data => {
                console.log(data)
                if (data)
                    Alert.alert('SignedIn');
                else    
                    Alert.alert('Not signed in');
            });
        } catch( error){
            console.log(error)
        }
    }


    return (
        <View style={styles.container}>
            <GoogleSigninButton
                onPress={() => signIn()}
                style={styles.button}
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}    
            />
            <TouchableOpacity
                style={styles.testButton}
                onPress={() => isSignedIn()}>

                <Text>Test</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    button:{
        
    },
    testButton: {
        backgroundColor: 'white'
    }
});

export default GoogleSignInPage;

