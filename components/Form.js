import { NavigationContainer } from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useEffect } from 'react/cjs/react.production.min';
import {AuthContext} from '../services/AuthContext';
import useGlobalState from '../store/useGlobalState';

const Form = ({props}) => {
    const {state, actions} = useContext(AuthContext);
    const globalState = useGlobalState();

    return (
        <>
            {globalState.state.driveApi === null ? (
            <View style={styles.container}>
            <TextInput
                style={styles.amountInput}
                placeholder='$0.00'
                placeholderTextColor='#E3E3E3'
                textAlign='left'
                selectTextOnFocus={true}>
            </TextInput>
            
            <TextInput
                style={styles.descriptionInput}
                placeholder='description'
                placeholderTextColor='#E3E3E3'
                textAlign='left'
                selectTextOnFocus={true}>
            </TextInput>

            <TextInput
                style={styles.categoryInput}
                placeholder='category'
                placeholderTextColor='#E3E3E3'
                textAlign='left'
                selectTextOnFocus={true}>
            </TextInput>

            <TouchableOpacity
                style={styles.button}
                // onPress={() => navigation.navigate('SheetSelection')}
                // onPress={() => {getFolder(1)}}
                onPress={() => actions({type: 'setState', payload: {...state, user: null}})}
                >
                <Text style={styles.buttonText}>Spent</Text>
            </TouchableOpacity> 
            </View>
            )  : 
                <Text style={{color: 'white'}}>Loading</Text>
            } 
        </>
    )

};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'center',
        // paddingTop: 10
    },
    amountInput: {
        fontSize: 16,
        color: '#E3E3E3',
        // borderColor: 'white',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#282828'
    },
    descriptionInput: {
        fontSize: 16,
        color: '#E3E3E3',
        // borderWidth: 2,
        // borderColor: 'white',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#282828'
    },
    categoryInput: {
        fontSize: 16,
        color: '#E3E3E3',
        // borderWidth: 2,
        // borderColor: 'white',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#282828'
    },
    button: {
        justifyContent: 'center',
        
        borderWidth: 2,
        //borderColor: 'white',
        backgroundColor: '#44D4A4',
        borderRadius: 50,
        width: '50%',
        height: 50,
        padding: 10
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF'
    }
});

export default Form;