import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Directions } from 'react-native-gesture-handler';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>October 2021</Text>
            <Text style={styles.totalText}>$4,002.00</Text>
        </View>
    
    );
};

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#C3C3C3',
        paddingLeft: 20,
    },
    totalText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#C3C3C3',
        paddingLeft: 20
    }
});

export default Header;