import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, ActivityIndicator} from 'react-native';
import Transaction from './Transaction';
import Form from './Form';
import Header from './Header';
import {AuthContext} from '../services/AuthContext';

const Log = ({navigation}) => {

    const {state, actions} = useContext(AuthContext);
    
    return(
        
        <View>
            {console.log(state.focusedSheet)}
            {state.focusedSheet !== null ?
                <View style={styles.container}> 
                    <View style={styles.headerContainer}>
                    <Header 
                        title={state.focusedSheet.sheet.title}
                        total={state.focusedSheet.categories[0].total}
                        />
                    </View>

                    <View style={styles.formContainer}>
                        <Form navigation={navigation}/>
                    </View>

                    <View style={styles.transactionsContainer}>
                        <Transaction transactions={state.focusedSheet} />
                    </View>
                </View> : 
                <ActivityIndicator/>}
            
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
    backgroundColor: '#000',
    padding: 10
   },
   headerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
    borderRadius: 20,
    
   },
   formContainer:{
    flex: 2,
    backgroundColor: '#121212',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 10
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20
   },
   transactionsContainer: {
    flex: 2,
    backgroundColor: '#121212',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 40,
    
   }
});

export default Log;