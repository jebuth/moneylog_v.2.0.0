import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import {AuthContext} from '../services/AuthContext';
import useGlobalState from '../store/useGlobalState';

const Header = (props) => {
    const {state, theme,  actions} = useContext(AuthContext);

    //const [darkMode, setDarkMode] = useState(true); 

    
    const toggleSwitch = () => {
        //setDarkMode(!darkMode)
        actions(
            {
                type: 'setTheme', 
                payload: 
                    {
                        ...theme, 
                        darkMode : !theme.darkMode
                    }
        });

        console.log('toggleSwitch: theme');
        console.log(theme)
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftCard}>
                <Text style={theme.darkMode ? styles.titleText_Dark : styles.titleText}>{props.title}</Text>
                <Text style={theme.darkMode ? styles.totalText_Dark : styles.totalText}>{props.total}</Text>
            </View>
            <View style={styles.rightCard}>
                <Switch
                trackColor={{ false: "#050505", true: "#F7F7FA" }}
                thumbColor={theme.darkMode ? "#050505" : "#F7F7FA"}
                ios_backgroundColor="#23273c"
                onValueChange={toggleSwitch}
                value={theme.darkMode}
                />
            </View>
        </View>
    
    );
};

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
    },
    leftCard:{
        flex: 5
    },
    rightCard:{
        flex: 1,
        paddingRight: 10
    },
    titleText_Dark: {
        fontSize: 24,
        fontWeight: 'bold',
        //opacity: 87,
        //color: '#fff', // palette Date
        color: '#E1E0E6', // palette Date
        paddingLeft: 20,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#23273C', // pallete side bar
        paddingLeft: 20,
    },
    totalText_Dark: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E1E0E6', // palette Date
        paddingLeft: 20
    },
    totalText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#23273C', // pallete side bar
        paddingLeft: 20
    }
});

export default Header;