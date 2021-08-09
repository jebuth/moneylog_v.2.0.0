import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import transactions from './TransactionsDb';

const Transaction = (props) => {

    console.log('Transaction');
    console.log(props)
    const TransactionItem = ({item}) => {
        return (
            <View style={styles.transaction}>
                <View>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <View>
                    <Text style={styles.amountText}>{item.total}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={props.transactions.categories.slice(1)}
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
        paddingRight: 150,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#C3C3C3', // good white
        //color: '#44d4a4' // good green
    },
    amountText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#Ca3e47',
    }

    
});

export default Transaction;