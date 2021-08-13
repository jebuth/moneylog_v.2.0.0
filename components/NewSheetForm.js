import React, {useContext} from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../services/AuthContext';
import {useForm, Controller} from 'react-hook-form';

const NewSheetForm = () => {

    const {state, actions} = useContext(AuthContext);
    const {reset, control, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = async (formData, e) => {
        
        console.log(e.target);
        reset({});
        fetch(`http://192.168.0.149:3000/create`, {
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
            console.log(data);
            let sheets = state.sheets;
            console.log(sheets);
            let newSheet = {
                id: data.id,
                title: data.name
            }
            console.log(newSheet)
            sheets.push(newSheet);
            console.log(sheets);
            actions(
                {
                    type: 'setState', 
                    payload: 
                        {
                            ...state, 
                            sheets: sheets,
                        }
            })
            
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput                
                                style={styles.inputText}                                
                                placeholder='title'
                                placeholderTextColor='#E3E3E3'
                                textAlign='left'
                                selectTextOnFocus={true}
                                onBlur={onBlur}
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