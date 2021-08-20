import { NavigationContainer } from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput, Alert} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useEffect, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min';
import {AuthContext} from '../services/AuthContext';
import useGlobalState from '../store/useGlobalState';
import {useForm, Controller} from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';

const Form = (props, {navigation}) => {
    const {state, actions} = useContext(AuthContext);

    // const {reset, control, handleSubmit, formState, setValue} = useForm({mode: "onChange"});
    const { reset, control, handleSubmit, setValue, formState: {errors, clearErrors, isDirty, isValid}} = useForm({mode: "onChange"});

    const onSubmit = async (formData, e) => {
        try{

            // console.log('formData');
            // console.log(formData);
            // console.log(spendingCategory);

            // console.log('amountInput')
            // console.log(amountInput)
            console.log('calling onSubmit')
            
            // await fetch(`http://192.168.0.149:3000/update`, {
                await fetch(`http://ec2-52-90-44-164.compute-1.amazonaws.com:3000/update`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    spreadsheetId: state.focusedSheet.sheet.id,
                    amount: formData.amount,
                    description: formData.description,
                    category: spendingCategory // don't use formData.category
                })
            })
            .then((response) => {
                if(response.status < 200 || response.status > 299){
                    console.log(response.status);
                    console.log(response)
                }

            })
            .catch((error) => {
                console.log('update error')
                console.log(error)
            })
            .finally(() => {
                // setValue('amount', null, {shouldValidate: true})
                // setValue('description', null, {shouldValidate: true})
                setValue('amount', null)
                setValue('description', null)
            }) 
        } catch (error){
            console.log(error);
            //reset();
        }
        
    }

    const spendingCategories =  props.transactions.categories.slice(1).map(function(cat, index){
        return {key: index, label: cat.category, value: cat.category}
    });

    const [amountTextFocused, setAmountTextFocused] = useState(false);
    const [descriptionTextFocused, setDescriptionTextFocused] = useState(false);
    const [categoryTextFocused, setCategoryTextFocused] = useState(false);

    // const [amountInput, setAmountInput] = useState(null);
    // const [descriptionInput, setDescriptionInput] = useState(null);
    const [spendingCategory, setSpendingCategory] = useState(spendingCategories[0].value)

    
    // console.log('formState');
    // console.log(formState);

    // console.log('isValid');
    // console.log(isValid);

    console.log('errors')
    console.log(errors)
    
    console.log('errors.amount')
    console.log(errors.amount)

    console.log('errors.description')
    console.log(errors.description)

    // if(errors.amount || errors.description){
    //     setInputErrors(errors);
    // }
    // else{
    //     setInputErrors(null)
    // }

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
                            //onChangeText={(value) => setAmountInput(value)}
                            value={value}
                            keyboardType='numeric'
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
                            autoCorrect={false}
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
                    render={({field: {onChange, value}}) => (
                        // <TextInput
                        //     style={categoryTextFocused ? styles.amountInputFocused : styles.amountInput}
                        //     placeholder='category'
                        //     placeholderTextColor='#E3E3E3'
                        //     textAlign='left'
                        //     selectTextOnFocus={true}
                        //     onBlur={() => setCategoryTextFocused(false)}
                        //     onFocus={() => setCategoryTextFocused(true)}
                        //     onChangeText={onChange}
                        //     value={value}
                        // />
                        <RNPickerSelect
                            style={categoryTextFocused ? pickerStyleFocused : pickerStyle}
                            placeholder={{}}
                            placeholderTextColor='#E3E3E3'
                            textAlign='left'
                            // selectTextOnFocus={true}
                            onBlur={() => setCategoryTextFocused(false)}
                            onFocus={() => setCategoryTextFocused(true)}
                            onChangeText={onChange}
                            onValueChange={(value, index) => setSpendingCategory(value)}
                            //onValueChange={(value, index) => console.log(value)}
                            // value={spendingCategory}
                            //value={value}
                            items={spendingCategories}
                        />
                    )}
                    name="category"
                    defaultValue={spendingCategories[0].value} 
                />


            <TouchableOpacity
                // style={!formState.isValid ? styles.buttonDisabled : styles.button}
                style={(errors.amount || errors.description) ? styles.buttonDisabled : styles.button}
            
                onPress={handleSubmit(onSubmit)}
                //disabled={!formState.isValid}
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

const pickerStyle = StyleSheet.create({
    inputIOS: {
        left: '25%', // to horizontally align the picker with other text inputs
        fontSize: 16,
        color: '#E3E3E3',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#282828',
    }
})

const pickerStyleFocused = StyleSheet.create({
    inputIOS: {
        left: '25%', // to horizontally align the picker with other text inputs
        fontSize: 16,
        color: '#E3E3E3',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#282828',

        borderColor: '#E3E3E3',
        borderWidth: 1,
        shadowOpacity: 1.8,
        shadowRadius: 3,
        shadowOffset: {
            width: 2,
            height: 2
        }
    }
})

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'center',
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