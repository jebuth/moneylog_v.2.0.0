import React, {useState, useEffect, useContext} from 'react';
import {Alert, View, Text, StyleSheet} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../services/AuthContext';

const GoogleSignInPage = () => {
    const {signIn} = useContext(AuthContext);
    
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
                onPress={() => {signIn()}}
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

