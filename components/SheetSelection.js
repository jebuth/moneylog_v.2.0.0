import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import sheets from './SheetsDb';
import NewSheetForm from './NewSheetForm';
import SignOutButton from './SignOutButton';
import {AuthContext} from '../services/AuthContext';
//import useGlobalState from '../store/useGlobalState';

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

    const SheetItem = ({item}) => {
        return (
            <View style={styles.sheetItem}>
                <TouchableOpacity 
                    style={styles.sheetButton}
                    onPress={() => navigation.navigate('Log')}
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
            keyExtractor={(item) => item.id}/>
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
    paddingTop: 10,
    paddingBottom: 10,
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
        // borderColor: 'pink',
        // borderWidth: 2
    },
    signOutButton:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        height: 50,
        bottom: 50,
        width: '100%',
        borderRadius: 10
    },
    signOutText:{
        fontWeight: 'bold',
        color: 'white'
    }
});

export default SheetSelection;