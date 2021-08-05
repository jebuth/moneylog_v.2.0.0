import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Transaction from './Transaction';
import Form from './Form';
import Header from './Header';

const Log = ({navigation}) => {
    return(
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Header />
            </View>

            <View style={styles.formContainer}>
                <Form />
            </View>

            <View style={styles.transactionsContainer}>
                <Transaction />
            </View>
        </View>
    );    
}

const styles = StyleSheet.create({
   container:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#232A28',
    padding: 10
   },
   headerContainer: {
    flex: 1,
    justifyContent: 'center'
   },
   formContainer:{
    flex: 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20
   },
   transactionsContainer: {
    flex: 2,
    backgroundColor: 'blue',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
   }
});

export default Log;