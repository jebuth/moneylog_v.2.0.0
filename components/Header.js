import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import {AuthContext} from '../services/AuthContext';
import useGlobalState from '../store/useGlobalState';

const Header = (props) => {
    const {state, actions} = useContext(AuthContext);
    
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{props.title}</Text>
            <Text style={styles.totalText}>{props.total}</Text>
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