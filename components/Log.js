import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, BackHandler} from 'react-native';
import Transaction from './Transaction';
import Form from './Form';
import Header from './Header';
import {AuthContext} from '../services/AuthContext';
import LoadingIndicator from './LoadingIndicator';

const Log = ({navigation}) => {

    const {state, theme, actions} = useContext(AuthContext);
    console.log('Log');
    console.log(state);
    //console.log(navigation);
    
    return(
        
        <View>
            {console.log(state.focusedSheet)}
            {state.focusedSheet !== null ?
                <View style={theme.darkMode ? styles.container_Dark : styles.container}> 
                    <View style={theme.darkMode ? styles.headerContainer_Dark : styles.headerContainer}>
                        <Header 
                            title={state.focusedSheet.sheet.title}
                            total={state.focusedSheet.categories[0].total}
                        />
                    </View>

                    {state.loading ?
                    <> 
                        <LoadingIndicator/> 
                        <View style={{flex: 4}}></View> 
                    </>: 
                    <>
                        <View style={theme.darkMode ? styles.formContainer_Dark : styles.formContainer}>
                            <Form transactions={state.focusedSheet} navigation={navigation}/>
                        </View>

                        <View style={theme.darkMode ? styles.transactionsContainer_Dark : styles.transactionsContainer}>
                            <Transaction transactions={state.focusedSheet} />
                        </View>
                    </>
                    }

                    

                    
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
    backgroundColor: '#F7F7FA',
   },
   container_Dark:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    //backgroundColor: '#2D3146', // made up darker blue
    //backgroundColor: '#0c0c0c', // dark 2
    //backgroundColor: '#2f2f30', // dark 3
    
    backgroundColor: '#17181c', // dark 4 
   },
   headerContainer: {
    //flex: 1,
    minHeight: 150,
    maxHeight: 150,
    justifyContent: 'center',
    backgroundColor: '#F7F7FA', // formContainer
    borderRadius: 20,
   },
   headerContainer_Dark: {
    //flex: 1,
    minHeight: 150,
    maxHeight: 150,
    justifyContent: 'center',
    //backgroundColor: '#2D3146', // made up darker blue
    //backgroundColor: '#0c0c0c', // dark 2
    //backgroundColor: '#2f2f30', // dark 3
    
    backgroundColor: '#17181c', // dark 4 
    borderRadius: 30,
   },
   formContainer:{
    flex: 2,
    backgroundColor: '#E1E0E6', 
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    //top: 10,
    shadowOpacity: 1.8,
    shadowRadius: 5,
    shadowOffset: {
        width: 1,
        height: 1
    }
   },
   formContainer_Dark:{
    flex: 2,
    //backgroundColor: '#23273C', // palette blue
    //backgroundColor: '#050505', // dark 2
    
    //backgroundColor: '#27282e', // dark 3
     
    backgroundColor: '#0b0d12', // dark 4
    
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    //top: 10,
    shadowOpacity: 1.8,
    shadowRadius: 5,
    shadowOffset: {
        width: 1,
        height: 1
    }
   },
   transactionsContainer: {
    flex: 2,
    //backgroundColor: '#F7F7FA', // palette background
    backgroundColor: '#E1E0E6', // headerContainer tseting
    paddingBottom: 40,
   },
   transactionsContainer_Dark: {
    flex: 2,
    //backgroundColor: '#23273C', // palette blue
    //backgroundColor: '#050505', // dark 2
    //backgroundColor: '#27282e', // dark 3
    backgroundColor: '#0b0d12', // dark 4
    paddingBottom: 40,
   }
});

export default Log;