import { NavigationContainer } from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput, Alert} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useEffect } from 'react/cjs/react.production.min';
import {AuthContext} from '../services/AuthContext';
import useGlobalState from '../store/useGlobalState';
import {useForm, Controller} from 'react-hook-form';

const Form = ({props, navigation}) => {
    const {state, actions} = useContext(AuthContext);
    //const globalState = useGlobalState();
    // console.log('Form.js');
    // console.log(navigation)

    const {control, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = async (formData, e) => {
        console.log('state')
        console.log(e.target);
        fetch(`http://192.168.0.149:3000/update`, {
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
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            {state.driveApi !== null ? (
            <View style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.amountInput}
                            placeholder='$0.00'
                            placeholderTextColor='#E3E3E3'
                            textAlign='left'
                            selectTextOnFocus={true}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="amount"
                    defaultValue=""
                />
            
            <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.amountInput}
                            placeholder='description'
                            placeholderTextColor='#E3E3E3'
                            textAlign='left'
                            selectTextOnFocus={true}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="description"
                    defaultValue=""
                />
            
            <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.amountInput}
                            placeholder='category'
                            placeholderTextColor='#E3E3E3'
                            textAlign='left'
                            selectTextOnFocus={true}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="category"
                    defaultValue=""
                />


            <TouchableOpacity
                style={(errors.category || errors.amount || errors.description) ? styles.buttonDisabled : styles.button}
                // onPress={() => navigation.navigate('SheetSelection')}
                onPress={handleSubmit(onSubmit)}
                disabled={errors.category || errors.amount || errors.description}
                
                >
                {/* <Text style={styles.buttonText}>{(errors.category || errors.amount || errors.description) ? '' : 'Spent'}</Text> */}
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
        backgroundColor: '#282828',
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    button: {
        justifyContent: 'center',
        //backgroundColor: '#44D4A4', // bright
        backgroundColor: '#477D6E', // mid
        //backgroundColor: '#2d5248',
        borderRadius: 50,
        width: '50%',
        height: 50,
        padding: 10,
        shadowOpacity: 10,
        shadowRadius: 10,
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    buttonDisabled: {
        justifyContent: 'center',
        // backgroundColor: '#2d5248',
        backgroundColor: '#282828',

        
        borderRadius: 50,
        width: '50%',
        height: 50,
        padding: 10
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E3E3E3'
    }
});

export default Form;