import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

const SignIn = ({navigation}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={()=> navigation.navigate('Log')}
                style={styles.button}>
                <Text>Sign In</Text>
            </TouchableOpacity>
        </View>
    );    
}

const styles = StyleSheet.create({
   container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
   },
   button:{
        padding: 10,
        backgroundColor: '#44D4A4',
   }  
});

export default SignIn;