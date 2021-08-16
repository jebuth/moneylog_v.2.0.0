import { NavigationContainer } from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput, Alert} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useEffect, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min';
import {AuthContext} from '../services/AuthContext';
import useGlobalState from '../store/useGlobalState';
import {useForm, Controller} from 'react-hook-form';

const Form = ({props, navigation}) => {
    const {state, actions} = useContext(AuthContext);
    //const globalState = useGlobalState();
    // console.log('Form.js');
    // console.log(navigation)

    // const {reset, control, handleSubmit, formState: {errors}} = useForm();
    const {reset, control, handleSubmit, formState} = useForm({mode: "onChange"});
    const onSubmit = async (formData, e) => {
        try{
            reset({});
            await fetch(`http://192.168.0.149:3000/update`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    spreadsheetId: state.focusedSheet.sheet.id,
                    amount: formData.amount,
                    description: formData.description,
                    category: formData.category
                })
            })
            .then((response) => {
                if(response.status < 200 || response.status > 299){
                    console.log(response.status);
                }
            })
            .catch((error) => {
                console.log('update error')
                console.log(error)
            })
        } catch (error){
            console.log(error);
        }
        
    }

    const [amountTextFocused, setAmountTextFocused] = useState(false);
    const [descriptionTextFocused, setDescriptionTextFocused] = useState(false);
    const [categoryTextFocused, setCategoryTextFocused] = useState(false);

    
    return (
        <>
        
            {state.driveApi !== null ? (
            <View style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextInput
                            style={amountTextFocused ? styles.amountInputFocused : styles.amountInput}
                            placeholder='$0.00'
                            placeholderTextColor='#E3E3E3'
                            textAlign='left'
                            selectTextOnFocus={true}
                            onBlur={() => setAmountTextFocused(false)}
                            onFocus={() => setAmountTextFocused(true)}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="amount"
                    defaultValue={null}
                />
            
            <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextInput
                            style={descriptionTextFocused ? styles.amountInputFocused : styles.amountInput}
                            placeholder='description'
                            placeholderTextColor='#E3E3E3'
                            textAlign='left'
                            selectTextOnFocus={true}
                            onBlur={() => setDescriptionTextFocused(false)}
                            onFocus={() => setDescriptionTextFocused(true)}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="description"
                    defaultValue={null}
                />
            
            <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={categoryTextFocused ? styles.amountInputFocused : styles.amountInput}
                            placeholder='category'
                            placeholderTextColor='#E3E3E3'
                            textAlign='left'
                            selectTextOnFocus={true}
                            onBlur={() => setCategoryTextFocused(false)}
                            onFocus={() => setCategoryTextFocused(true)}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="category"
                    defaultValue={null}
                />


            <TouchableOpacity
                style={!formState.isValid ? styles.buttonDisabled : styles.button}
                onPress={handleSubmit(onSubmit)}
                disabled={!formState.isValid}
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
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#282828',
    },
    amountInputFocused:{
        fontSize: 16,
        color: '#E3E3E3',
        borderRadius: 10,
        borderColor: '#E3E3E3',
        borderWidth: 1,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#282828',
        shadowOpacity: 1.8,
        shadowRadius: 3,
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    button: {
        justifyContent: 'center',
        //backgroundColor: '#44D4A4', // bright
        //backgroundColor: '#477D6E', // mid
        //backgroundColor: '#2d5248',
        backgroundColor: '#36b592', // test
        borderRadius: 50,
        width: '50%',
        height: 50,
        padding: 10,
        shadowOpacity: 10,
        shadowRadius: 10,
        shadowOffset: {
            width: 2,
            height: 2
        },
        borderColor: '#E3E3E3',
        borderWidth: 1
    },
    buttonDisabled: {
        justifyContent: 'center',
        // backgroundColor: '#2d5248',
        backgroundColor: '#282828',
        borderRadius: 50,
        width: '50%',
        height: 50,
        padding: 10,
        borderColor: '#E3E3E3',
        borderWidth: 1
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E3E3E3'
    }
});

export default Form;