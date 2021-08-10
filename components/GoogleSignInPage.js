import React, {useState, useEffect, useContext} from 'react';
import {Alert, View, Text, StyleSheet} from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../services/AuthContext';
import GoogleDriveApi from '../services/GoogleDriveApi';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

const GoogleSignInPage = () => {

    // configure google
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive', 
            'https://www.googleapis.com/auth/spreadsheets'],
            //webClientId: '1022434323661-1s2e6gp6apflltb2ll7e9dnvq42tsnlu.apps.googleusercontent.com',
            webClientId: '900377601007-r8md298tu3q8qeghpbrbgtfiv12b4jd4.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            loginHint: '',
            accountName: '',
            //iosClientId: '1022434323661-1s2e6gp6apflltb2ll7e9dnvq42tsnlu.apps.googleusercontent.com'
            iosClientId: '900377601007-p6okufst1m4k299t9kmpvi2p7d0l3h4a.apps.googleusercontent.com',
        });
    }, []);

    const {state, actions} = useContext(AuthContext); 

    let googleUser = null;
    let driveApi = null;
    let driveFolder = null;
    let sheets = [];
    let focusedSheet = null;

    const signIn = async () => {
        try{
          //await GoogleSignin.hasPlayServices();
          await GoogleSignin.signIn()
          .then( async (data) => {
            googleUser = data.user;
            await GoogleSignin.getTokens()
            .then(token => {
                console.log(googleUser);
                console.log('token');
                console.log(token);
                driveApi = new GoogleDriveApi();
                driveApi.GDrive.accessToken = token.accessToken;
                getFolder(driveApi);
            })
            //driveApi.accessToken = (await GoogleSignin.getTokens());    
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
              Alert('some other error happened');
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

    const getFolder = async (driveApi) => {
        // console.log('getFolder');

        // console.log(driveApi);
    
        try{
            let response = await driveApi.GDrive.files.list({
                corpora: 'user',
                q: "mimeType = 'application/vnd.google-apps.folder' and name = 'moneyLogExpenses'"
            });
            
            if (response.files.length > 0){
                driveFolder = response.files[0];

                getSpreadSheets(driveFolder);
            }
            else{
                // create the moneyLogExpenses folder
            }
            
            
        } catch (error) {
            console.log(error.response);
        }
        
    }

    const getSpreadSheets = async (driveFolder) => {
        console.log('getSpreadSheets');
        
        try{
            let response = await driveApi.GDrive.files.list(
                {
                    q: `'${driveFolder.id}' in parents and mimeType='application/vnd.google-apps.spreadsheet'`,
                    orderBy: 'modifiedTime desc'
                });
            if(response.files.length > 0){
                response.files.forEach(file => {
                    sheets.push({
                        'id' : file.id,
                        'title' : file.name,
                    });
                })
            }

            await getFocusedSheet(sheets[0]);
            console.log('after getFocusedSheet()');
            
        } catch (error){
            console.log(error.response);
        }
    }

    const getFocusedSheet = async (sheet) => {
        try{
            console.log('getFocusedSheet');

            await fetch(`http://192.168.0.149:3000/categories?ssid=${sheet.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                focusedSheet = {
                    sheet: sheet,
                    categories: data
                }
            }).catch((error) => {
                console.log(error.response);
            });
    
            actions(
                {
                    type: 'setState', 
                    payload: 
                        {
                            ...state, 
                            user: googleUser,
                            driveApi: driveApi,
                            sheets: sheets,
                            focusedSheet: focusedSheet,
                            //total: '$666.66',
                        }
            })
        } catch (error){
            console.log(error.response);
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>mongey_log</Text>
            <GoogleSigninButton
                onPress={() => {signIn()}}
                style={styles.button}
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}    
            />
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
    logo: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        bottom: 40
    },
    button:{
        borderRadius: 20
    },
    testButton: {
        backgroundColor: 'white'
    }
});

export default GoogleSignInPage;

