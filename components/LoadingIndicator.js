import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingIndicator = () => {
    return (
        <View style={styles.container}>
            
                <ActivityIndicator 
                    size='large' 
                    color='white'
                    style={styles.spinner}/>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        //backgroundColor: 'black',    
        //backgroundColor: 'black',
        opacity: 0.5,
        position: 'absolute'
    },
    spinner: {
        flex: 1
    }
});

export default LoadingIndicator;