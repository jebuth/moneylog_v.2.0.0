import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import transactions from './TransactionsDb';

const Transaction = () => {
    const TransactionItem = ({item}) => {
        return (
            <View style={styles.transaction}>
                <View>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <View>
                    <Text style={styles.amountText}>{item.amount}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                renderItem={TransactionItem}
                keyExtractor={(item) => item.category}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        alignItems: 'center',
        
    },
    transaction:{
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        padding: 10,
        margin: 2,
        borderRadius: 10,
        backgroundColor: '#181818'
        
    },
    categoryText:{
        paddingRight: 100,
        fontWeight: 'bold',
        fontSize: 24,
        color: '#C3C3C3', // good white
        //color: '#44d4a4' // good green
    },
    amountText:{
        fontWeight: 'bold',
        fontSize: 24,
        color: '#Ca3e47',
    }

    
});

export default Transaction;