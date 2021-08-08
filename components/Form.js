import { NavigationContainer } from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput} from 'react-native';
import {AuthContext} from '../services/AuthContext';

const Form = ({props}) => {

    const {getFolder} = useContext(AuthContext);

    return (
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
                onPress={() => {getFolder(1)}}
                >
                <Text style={styles.buttonText}>Spent</Text>
            </TouchableOpacity>
            
        </View>
    );
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