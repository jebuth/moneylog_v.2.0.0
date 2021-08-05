import React from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';

const NewSheetForm = () => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder='title'>
                </TextInput>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    inputContainer: {
        backgroundColor: '#282828',
        borderRadius: 10,
        flex: 6,
        height: '90%',
    },
    inputText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E3E3E3',
        //marginRight: 'auto',
        height: '100%',
        width: '100%',
        left: 10,
        
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: '#44D4A4',
        marginLeft: 'auto',
        //width: '5%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        height: '90%',
        width: '90%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#e3e3e3',
        fontWeight: 'bold',
        fontSize: 24
    }
});

export default NewSheetForm;