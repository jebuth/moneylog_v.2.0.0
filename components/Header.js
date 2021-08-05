import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Directions } from 'react-native-gesture-handler';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>October 2021</Text>
            <Text style={styles.totalText}>$4002.00</Text>
        </View>
    
    );
};

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        borderColor: 'green',
        borderWidth: 2
        // justifyContent: 'center'
    },
    titleText: {
        borderColor: 'white',
        borderWidth: 1
    },
    totalText: {
        borderColor: 'white',
        borderWidth: 1
    }
});

export default Header;