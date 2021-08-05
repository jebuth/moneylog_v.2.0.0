import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import sheets from './SheetsDb';
import NewSheetForm from './NewSheetForm';

const SheetSelection = ({navigation}) => {
    
    const SheetItem = ({item}) => {
        return (
            <View style={styles.sheetItem}>
                <TouchableOpacity 
                    style={styles.sheetButton}
                    onPress={() => navigation.navigate('Log')}
                    >
                    <Text style={styles.sheetText}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <NewSheetForm />
            </View>
            <FlatList 
            style={styles.listContainer}
            data={sheets}
            renderItem={SheetItem}
            keyExtractor={(item) => item.id}/>
        </View>
    );    
}

const styles = StyleSheet.create({
   container:{
       display: 'flex',
       width: '100%',
       height: '100%',
       backgroundColor: '#000',
       padding: 10
   },
   headerContainer: {
    flex: .09,
    justifyContent: 'center'
   },
   listContainer:{
    top: 20,
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
    // borderColor: 'pink',
    // borderWidth: 1
   },
   sheetItem:{
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 2,
    borderRadius: 10,
    backgroundColor: '#181818'

    },
    sheetText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#C3C3C3', // good white
    },
    
    sheetButton:{
        width: '100%',
        // borderColor: 'pink',
        // borderWidth: 2
    }
});

export default SheetSelection;