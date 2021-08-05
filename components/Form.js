import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput} from 'react-native';

const Form = () => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.amountInput}
                placeholder='$0.00'
                textAlign='left'
                selectTextOnFocus={true}>
            </TextInput>
            
            <TextInput
                style={styles.descriptionInput}
                placeholder='description'
                textAlign='left'
                selectTextOnFocus={true}>
            </TextInput>

            <TextInput
                style={styles.categoryInput}
                placeholder='description'
                textAlign='left'
                selectTextOnFocus={true}>
            </TextInput>

            <TouchableOpacity
                style={styles.button}
                u
                >
                <Text style={styles.buttonText}>Log</Text>
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
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10
    },
    descriptionInput: {
        fontSize: 16,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10
    },
    categoryInput: {
        fontSize: 16,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10
    },
    button: {
        fontSize: 16,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50,
        width: '50%',
        height: 50,
        padding: 10
    },
    buttonText:{
        textAlign: 'center',
        justifyContent: 'center'
    }
});

export default Form;