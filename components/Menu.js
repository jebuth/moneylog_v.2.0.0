import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const Menu = ({navigation}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text>Sign In</Text>
            </TouchableOpacity>
        </View>
    );    
}

const styles = StyleSheet.create({
   container:{

   },
   button:{

   }  
});

export default Menu;