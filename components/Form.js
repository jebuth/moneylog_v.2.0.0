import { NavigationContainer, TabRouter } from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput, Alert} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useEffect, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min';
import {AuthContext} from '../services/AuthContext';
import useGlobalState from '../store/useGlobalState';
import {useForm, Controller} from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import LoadingIndicator from './LoadingIndicator';
import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

const Form = (props, {navigation}) => {
    const {state, theme, actions} = useContext(AuthContext);
    const { reset, control, handleSubmit, setValue, formState: {errors, clearErrors, isDirty, isValid}} = useForm({mode:'all'});

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    // console.log('errors');
    // console.log(errors);

    // console.log('Object.keys(errors)');
    // console.log(Object.keys(errors));
    
    // console.log('Object.keys(errors).length');
    // console.log(Object.keys(errors).length);

    const onSubmit = async (formData, e) => {
        try{
            
            console.log(formData);

            actions(
                {
                    type: 'setState', 
                    payload: 
                        {
                            ...state, 
                            loading: true
                        }
            })
        
                await fetch(`http://ec2-52-90-44-164.compute-1.amazonaws.com:3000/update`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    spreadsheetId: state.focusedSheet.sheet.id,
                    // amount: formData.amount,
                    // description: formData.description,
                    // category: spendingCategory // don't use formData.category
                    amount: amount,
                    description: description,
                    category: spendingCategory // don't use formData.category
                })
            })
            .then((response) => {
                if(response.status < 200 || response.status > 299){
                    // console.log(response.status);
                    // console.log(response)
                    Alert.alert(response)
                }

                console.log(response);

                let targetCategory = state.focusedSheet.categories.find(cat => cat.category == spendingCategory);
                let floatTargetCategoryAmount = parseFloat(targetCategory.total.substring(1).replace(/,/g, ''));
                // let amountLogged = parseFloat(formData.amount); // redct-hook form
                let amountLogged = parseFloat(amount);
                console.log('amountLogged');
                console.log(amountLogged);
                let sheetTotalFloat = parseFloat(state.focusedSheet.categories[0].total.substring(1).replace(/,/g, ''));

                console.log('state.focusedSheet.categories[0].total.substring(1): ' + state.focusedSheet.categories[0].total.substring(1))
                console.log('floatTargetCategoryAmount: ' + floatTargetCategoryAmount );
                console.log('amountLogged: ' + amountLogged);
                console.log('sheetTotalFloat: ' + sheetTotalFloat);

                console.log('setState: ' + Math.round(sheetTotalFloat + amountLogged));

                state.focusedSheet.categories[0].total = '$' + Math.round(sheetTotalFloat + amountLogged).toLocaleString();
                targetCategory.total = '$' + Math.round(floatTargetCategoryAmount + amountLogged).toLocaleString();
                
                // reset state of for, inputs
                // setAmount(null);
                // setDescription(null);
                
                actions(
                    {
                        type: 'setState', 
                        payload: 
                            {
                                ...state, 
                                focusedSheet : state.focusedSheet,
                                loading: false
                            }
                })

            })
            .catch((error) => {
                // console.log('update error')
                // console.log(error)
                Alert.alert(error);
            })
            .finally(() => {
                // setValue('amount', null, {shouldValidate: true})
                // setValue('description', null, {shouldValidate: true})
                setValue('amount', null)
                setValue('description', null)
            }) 
        } catch (error){
            Alert.alert(error);
            //console.log(error);
            //reset();
        }
        
    }

    const formHasErrors = () => {
        console.log('formHasErrors');
        console.log('amount');
        console.log(amount);

        console.log('description');
        console.log(description);

        //debugger;
        if(!isEmpty(amount) && !isEmpty(description))
            return false;
        return true;
    }

    function isEmpty(str) {
        return (!str || str.length === 0 );
    }
    // attempt at debugging why validation isn't working
    const objectHasErrors = (object) => {
        console.log('objectHasErrors');
        console.log(object.keys(errors));

        console.log('objectHasErrors.length');
        console.log(object.keys(errors).length);

        if(object.keys(errors).length > 0){
            console.log('true')
            return true;
        }
        else{
            console.log('false')
            return false;
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


    return (
        <>
        
            {state.driveApi !== null && !state.loading ? (
            <View style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextInput
                            // style={amountTextFocused ? styles.amountInputFocused : styles.amountInput}
                            style={theme.darkMode ? styles.amountInput_Dark : styles.amountInput}
                            placeholder='$0.00'
                            placeholderTextColor={theme.darkMode? '#E1E0E6' : '#121212' }
                            textAlign='left'
                            selectTextOnFocus={true}
                            onBlur={() => setAmountTextFocused(false)}
                            onFocus={() => setAmountTextFocused(true)}
                            //onChangeText={onChange}
                            //onChangeText={(value) => setAmountInput(value)}
                            onChangeText={(value) => setAmount(value)}
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
                            // style={descriptionTextFocused ? styles.amountInputFocused : styles.amountInput}
                            style={theme.darkMode? styles.amountInput_Dark : styles.amountInput}
                            placeholder='description'
                            placeholderTextColor={theme.darkMode? '#E1E0E6' : '#121212' }
                            textAlign='left'
                            selectTextOnFocus={true}
                            onBlur={() => setDescriptionTextFocused(false)}
                            onFocus={() => setDescriptionTextFocused(true)}
                            //onChangeText={onChange}
                            onChangeText={(value) => setDescription(value)}
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
                        <RNPickerSelect
                            //style={categoryTextFocused ? pickerStyleFocused : pickerStyle}
                            style={theme.darkMode ? pickerStyleDark : pickerStyle}
                            placeholder={{}}
                            placeholderTextColor='#E1E0E6'
                            textAlign='left'
                            // selectTextOnFocus={true}
                            onBlur={() => setCategoryTextFocused(false)}
                            onFocus={() => setCategoryTextFocused(true)}
                            // onChangeText={onChange}
                            //onChangeText={(value) => setCategory(value)}
                            onValueChange={(value, index) => setSpendingCategory(value)}
                            //onValueChange={(value, index) => console.log(value)}
                            value={spendingCategory}
                            //value={value}
                            items={spendingCategories}
                        />
                    )}
                    name="category"
                    defaultValue={spendingCategories[0].value} 
                />


            <TouchableOpacity
                // style={!formState.isValid ? styles.buttonDisabled : styles.button}
                // style={(errors.amount || errors.description) ? styles.buttonDisabled : styles.button}
                //style={(Object.keys(errors).length != 0) ? styles.buttonDisabled : styles.button}
                //style={objectHasErrors(Object) ? styles.buttonDisabled : styles.button}
                style={formHasErrors() ? styles.buttonDisabled : styles.button}
                onPress={handleSubmit(onSubmit)} // w react-hook-form
                onPress={onSubmit}
                disabled={formHasErrors()}
            >  
                <Text style={styles.buttonText}>Spent</Text>
            </TouchableOpacity> 
            </View>
            )  : 
                // <Text style={{color: 'white'}}>Loading</Text>
                <LoadingIndicator/>
            } 
        </>
    )

};

const pickerStyleDark = StyleSheet.create({
    inputIOS: {
        left: '25%', // to horizontally align the picker with other text inputs
        fontSize: 16,
        color: '#E1E0E6',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        //backgroundColor: '#2D3146' // made up darker blue
        //backgroundColor: '#0c0c0c', // dark 2
        //backgroundColor: '#2f2f30', // dark 3
        //backgroundColor: '#0b0d12', // dark 4
        backgroundColor: '#17181c', // dark 4 
        
    }
})

const pickerStyle = StyleSheet.create({
    inputIOS: {
        left: '25%', // to horizontally align the picker with other text inputs
        fontSize: 16,
        color: '#121212',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#F7F7FA', // formContainer testing
    }
})

const pickerStyleFocused = StyleSheet.create({
    inputIOS: {
        left: '25%', // to horizontally align the picker with other text inputs
        fontSize: 16,
        color: '#23273C', // pallete side bar
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff', // palette table row
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
        color: '#121212',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#F7F7FA', // formContainer testing

    },
    amountInput_Dark: {
        fontSize: 16,
        color: '#E1E0E6',
        borderRadius: 10,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        //backgroundColor: '#2D3146' // made up dark pallete for input
        //backgroundColor: '#0c0c0c', // dark 2
        //backgroundColor: '#2f2f30', // dark 3
        //backgroundColor: '#0b0d12', // dark 4
        backgroundColor: '#17181c', // dark 4 
        
    },
    
    amountInputFocused:{
        fontSize: 16,
        //color: '#E3E3E3',
        color: '#23273C', // pallete side bar
        borderRadius: 10,
        borderColor: '#23273C', // pallete side bar
        borderWidth: 1,
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        //backgroundColor: '#282828',
        backgroundColor: '#fff', // palette table row
        shadowOpacity: 1.8,
        shadowRadius: 1,
        shadowOffset: {
            width: .2,
            height: .2
        }
    },
    button: {
        justifyContent: 'center',
        //backgroundColor: '#44D4A4', // bright
        backgroundColor: '#36b592', // test 
        borderRadius: 50,
        width: '50%',
        height: 50,
        padding: 10,
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            width: .3,
            height: .3
        },
        // borderColor: '#E3E3E3',
        // borderWidth: 1
    },
    buttonDisabled: {
        justifyContent: 'center',
        //backgroundColor: '#2D3146', // made up dark pallete for input
        //backgroundColor: '#2f2f30', // dark 3
        //backgroundColor: '#17181c', // dark 4 
        //backgroundColor: '#36b592', // green
        backgroundColor: 'rgba(54, 181, 146, .25)' ,
        
        //opacity: 0.06,
        borderRadius: 50,
        width: '50%',
        height: 50,
        padding: 10,
        // borderColor: '#E3E3E3',
        // borderWidth: 1
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E3E3E3'
    },
});

export default Form;