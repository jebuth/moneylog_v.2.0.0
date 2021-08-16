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
                await createFolder();
            }
        }
        catch (error) {
            console.log(error.response);
        }   
    }

    const createFolder = async () => {
        console.log('createFolder()');
        // create the moneyLogExpenses folder
        try{
            let response = (await driveApi.GDrive.files.newMetadataOnlyUploader()
            .setRequestBody({
                name: 'moneyLogExpenses',
                mimeType: 'application/vnd.google-apps.folder',
                parents: ['root'],
            })
            .execute()
            );

            if (response){
                //console.log(response)
                driveFolder = response;
                let permissionRequest = await createFolderPermissions(response);

                if(permissionRequest){
                    // pass the folder (response) to createSpreadsheet
                    await createSpreadsheet(response);
                }
            } else{
                console.log('nothing returned')
            }

        }catch (error){
            console.log(error);
            console.log(error.response);
            console.log(error.status)
        }
    }

    const createFolderPermissions = async (folder) => {
        console.log('createFolderPermissions()')
        
        try{
            let response = await driveApi.GDrive.permissions.create(
                folder.id, 
                null,
                {
                    role: 'writer',
                    type: 'user',
                    emailAddress: 'awesomeproject@awesomeproject-232905.iam.gserviceaccount.com'
                }    
            );

            if(response){
                return response;
            }
            else {
                console.log('createFolderPermissions error')
            }

        } catch (error){
            console.log('createFolderPermissions catch error');
            console.log(error)
        }
        
    }

    const createSpreadsheet = async (folder) => {
        console.log('createSpreadsheet()')
        await fetch(`http://192.168.0.149:3000/create`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                folderId: folder.id,
                name: 'MONTH_YEAR'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            sheets.push({
                'id' : data.id,
                'title' : data.name,
            });
            getFocusedSheet(data);
            
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const getSpreadSheets = async (folder) => {
        console.log('getSpreadSheets()');
        
        try{
            let response = await driveApi.GDrive.files.list(
                {
                    q: `'${folder.id}' in parents and mimeType='application/vnd.google-apps.spreadsheet'`,
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
            console.log('getFocusedSheet()');
            await fetch(`http://192.168.0.149:3000/categories?ssid=${sheet.id}`)
            .then((response) => {
                if(response.status >= 200 && response.status <= 299){
                    return response.json();
                } else {
                    console.log('143');
                }
            })
            .then((jsonResponse) => {

                    console.log('sheet');
                    console.log(sheet);
                    console.log('jsonResponse')
                    console.log(jsonResponse)

                    focusedSheet = {
                        sheet: {
                            'id' : sheet.id,
                            'title' : sheet.name,
                        },
                        categories: jsonResponse
                    }

                    actions(
                        {
                            type: 'setState', 
                            payload: 
                                {
                                    ...state, 
                                    user: googleUser,
                                    driveApi: driveApi,
                                    driveFolder: driveFolder,
                                    sheets: sheets,
                                    focusedSheet: focusedSheet,
                                }
                    })

            })
            .catch((error) => {
                console.log(error);
            });
            
        } catch (error){
            console.log('165')
            console.log(error);
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

