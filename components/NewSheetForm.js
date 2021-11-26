import React, {useContext, useState} from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../services/AuthContext';
import {useForm, Controller} from 'react-hook-form';

const NewSheetForm = () => {

    const {state, theme, actions} = useContext(AuthContext);
    const {reset, control, handleSubmit, formState} = useForm({mode: "onChange"});
    const [nameInputFocused, setNameInputFocused] = useState(false);

    const onSubmit = async (formData, e) => {
        
        // show spinner
        actions({
                type: 'setState', 
                payload: {
                        ...state, 
                        loading: true
                    }
                })

        console.log(e.target);
        reset({});
        // await fetch(`http://192.168.0.149:3000/create`, {
            await fetch(`http://ec2-52-90-44-164.compute-1.amazonaws.com:3000/create`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                folderId: state.driveFolder.id,
                name: formData.name
            })
        })
        .then(response => response.json())
        .then(data => {
            let sheets = state.sheets;
            console.log(sheets)
            let newSheet = {
                id: data.id,
                title: data.name
            }
            sheets.push(newSheet);
            actions(
                {
                    type: 'setState', 
                    payload: 
                        {
                            ...state, 
                            sheets: sheets,
                            loading: false
                        }
            })
            
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
        <View style={styles.headerBuffer}></View>
        <View style={styles.container}>
            <View style={theme.darkMode ? styles.inputContainer_Dark : styles.inputContainer}>
                <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({field: {onChange, value}}) => (
                            <TextInput                
                                // style={nameInputFocused ? styles.inputTextFocused : styles.inputText}                                
                                style={theme.darkMode ? styles.inputText_Dark : styles.inputText}
                                placeholder='new_log'
                                placeholderTextColor= {theme.darkMode ? '#E1E0E6' : '#23273C'}
                                textAlign='left'
                                selectTextOnFocus={true}
                                onBlur={() => setNameInputFocused(false)}
                                onFocus={() => setNameInputFocused(true)}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="name"
                        defaultValue=""
                    />
                
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    // style={!formState.isValid ? styles.buttonDisabled : styles.button}
                    style={theme.darkMode ? styles.button_Dark : styles.button}
                    disabled={!formState.isValid}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({    
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',  
        marginLeft: 20,
        marginRight: 20
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#23273C', 
        borderRadius: 10,
        flex: 6,
    },
    inputContainer_Dark: {
        borderWidth: 1,
        borderColor: '#E1E0E6',
        borderRadius: 10,
        flex: 6,
    },
    inputTextFocused:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E3E3E3',
        height: 50,
        width: '100%',
        paddingLeft: 10
    },
    inputText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#23273C', // pallete side bar
        height: 50,
        width: '100%',
        paddingLeft: 10
        
    },
    inputText_Dark:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E1E0E6',
        height: 50,
        width: '100%',
        paddingLeft: 10
        
    },
    buttonContainer: {
        flex: 1,
        marginLeft: 'auto',
        borderRadius: 10,
    },
    button:{
        //backgroundColor: '#F7F7FA', // formContainer
        backgroundColor: 'black', // formContainer
        height: 50,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: '#23273C', 
        // borderWidth: 1
    },
    button_Dark:{
        backgroundColor: '#2D3146',
        backgroundColor: 'black',
        height: 50,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: '#E3E3E3',
        // borderWidth: 1
    },
    // buttonDisabled: {
    //     backgroundColor: '#282828',
    //     height: 50,
    //     width: '100%',
    //     borderRadius: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderColor: '#E3E3E3',
    //     borderWidth: 1
    // },
    buttonText:{
        color: '#e3e3e3',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center'
    }
});

export default NewSheetForm;