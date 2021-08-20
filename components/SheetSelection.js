import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import sheets from './SheetsDb';
import NewSheetForm from './NewSheetForm';
import SignOutButton from './SignOutButton';
import {AuthContext} from '../services/AuthContext';

const SheetSelection = ({navigation}) => {
    
    //const {signOut} = useContext(AuthContext);
    const {state, actions} = useContext(AuthContext);
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
            <View style={styles.sheetItem}>
                <TouchableOpacity 
                    style={styles.sheetButton}
                    onPress={() => {getFocusedSheet(item)}}
                    >
                    <Text style={styles.sheetText}>{item.title}</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <NewSheetForm />
            </View>
            {/* <TouchableOpacity style={styles.button} onPress={signOut}></TouchableOpacity> */}
            <FlatList 
            style={styles.listContainer}
            data={state.sheets}
            renderItem={SheetItem}
            keyExtractor={(sheet) => sheet.id}/>
            <TouchableOpacity onPress={() => {signOut()}} style={styles.signOutButton}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );    
}

const styles = StyleSheet.create({
    button:{
        height: 100,
        width: 100,
        backgroundColor: 'white'
    },
   container:{
       display: 'flex',
       width: '100%',
       height: '100%',
       backgroundColor: '#000',
       padding: 10,
       alignContent: 'space-between',
   },
   headerContainer: {
        flex: .09,
        justifyContent: 'center'
   },
   listContainer:{
    marginTop: 20,
    marginBottom: 100,
    
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
    
    // borderColor: 'pink',
    // borderWidth: 1
   },
   sheetItem:{
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 2,
    borderRadius: 10,
    backgroundColor: '#181818'

    },
    sheetText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#C3C3C3', // good white
    },
    
    sheetButton:{
        width: '100%',
        height: '100%',
        // backgroundColor: 'pink'
        // borderColor: 'pink',
        // borderWidth: 2
    },
    signOutButton:{
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#282828',
        height: 50,
        bottom: 50,
        width: '100%',
        borderRadius: 10,
        borderColor: '#E3E3E3',
        
        borderWidth: 1
    },
    signOutText:{
        fontWeight: 'bold',
        color: 'white'
    }
});

export default SheetSelection;