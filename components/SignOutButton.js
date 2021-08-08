import React, {useContext} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const SignOutButton = () => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center'
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        height: 50,
        bottom: 50,
        width: '100%',
        borderRadius: 10
    },
    buttonText:{
        fontWeight: 'bold',
        color: 'white'
    }
});

export default SignOutButton;