import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import sheets from './SheetsDb';
import NewSheetForm from './NewSheetForm';
import SignOutButton from './SignOutButton';
import {AuthContext} from '../services/AuthContext';

const SheetSelection = ({navigation}) => {
    
    //const {signOut} = useContext(AuthContext);
    const {state, theme, actions} = useContext(AuthContext);
    const signOut = () => {
        console.log('SheetSelection.signOut');
        actions(
            {
                type: 'setState', 
                payload: 
                    {
                        ...state, 
                        user: null,
                        ss_title: '',
                        total: '',
                        driveApi: null
                    }
        })
    }

    const getFocusedSheet = async (sheet) => {
        try{
            console.log('getFocusedSheet');

            let focusedSheet = null;
            // await fetch(`http://192.168.0.149:3000/categories?ssid=${sheet.id}`)
            await fetch(`http://ec2-52-90-44-164.compute-1.amazonaws.com:3000/categories?ssid=${sheet.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                focusedSheet = {
                    sheet: sheet,
                    categories: data
                }
            }).catch((error) => {
                console.log('42')
                console.log(error.response);
            });
    
            actions(
                {
                    type: 'setState', 
                    payload: 
                        {
                            ...state, 
                            focusedSheet: focusedSheet,
                        }
            });

            navigation.navigate('Log');
        } catch (error){
            console.log('58')
            console.log(error);
        }
        
    }

    const SheetItem = ({item}) => {
        return (
            <View style={theme.darkMode ? styles.sheetItem_Dark : styles.sheetItem}>
                <TouchableOpacity 
                    style={styles.sheetButton}
                    onPress={() => {getFocusedSheet(item)}}
                    >
                    <Text style={theme.darkMode ? styles.sheetText_Dark : styles.sheetText}>{item.title}</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
    
    return(
        <View style={theme.darkMode ? styles.container_Dark : styles.container}>
            <View style={theme.darkMode ? styles.headerContainer_Dark : styles.headerContainer}>
                <NewSheetForm />
            </View>
            <View style={theme.darkMode ? styles.bodyContainer_Dark : styles.bodyContainer}>
                <FlatList 
                style={styles.listContainer}
                data={state.sheets}
                renderItem={SheetItem}
                keyExtractor={(sheet) => sheet.id}/>
                <TouchableOpacity onPress={() => {signOut()}} style={styles.signOutButton}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );    
}

const styles = StyleSheet.create({
    
   container:{
       display: 'flex',
       width: '100%',
       height: '100%',
       alignContent: 'space-between',
       backgroundColor: '#F7F7FA',
       //marginTop: 50 // leave space for statusBar
   },
   container_Dark:{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignContent: 'space-between',
        backgroundColor: '#2D3146', // made up darker blue
        //marginTop: 50 // leave space for statusBar
    },
   headerContainer: {
        //flex: 1,
        minHeight: 150,
        maxHeight: 150,
        justifyContent: 'center',
        backgroundColor: '#F7F7FA', // formContainer

   },
   headerContainer_Dark: {
        //flex: 1,
        minHeight: 150,
        maxHeight: 150,
        justifyContent: 'center',
        backgroundColor: '#2D3146', // made up darker blue
   },
   bodyContainer: {
        flex: 4,
        backgroundColor: '#E1E0E6', 
        borderTopRightRadius: 20,
        shadowOpacity: 1.8,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1
        }
   },
   bodyContainer_Dark: {
    flex: 4,
    backgroundColor: '#23273C', // palette blue
    borderTopRightRadius: 20,
    shadowOpacity: 1.8,
    shadowRadius: 5,
    shadowOffset: {
        width: 1,
        height: 1
    }
},
   listContainer:{
    marginTop: 20,
    marginBottom: 100,
    marginLeft: 10,
    marginRight:10,
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10,
   },
   sheetItem:{
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 2,
    borderRadius: 10,
    backgroundColor: '#E1E0E6', 
    shadowOpacity: 1.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 1
        }

    },
    sheetItem_Dark:{
        paddingTop: 14,
        paddingBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 2,
        borderRadius: 10,
        backgroundColor: '#23273C', // palette blue
        shadowOpacity: 1.8,
            shadowRadius: 2,
            shadowOffset: {
                width: 1,
                height: 1
            }
    
        },
    sheetText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#23273C', // pallete side bar
    },
    sheetText_Dark:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E1E0E6', // palette Date
    },
    sheetButton:{
        width: '100%',
        height: '100%',
    },
    signOutButton:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        bottom: 40,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderColor: '#E15460', // palette red
        borderWidth: 2
    },
    signOutText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E15460' // palette red
    }
});

export default SheetSelection;