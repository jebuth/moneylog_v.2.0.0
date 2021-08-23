import React, {useContext} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import transactions from './TransactionsDb';
import {AuthContext} from '../services/AuthContext';

const Transaction = (props) => {

    const {theme} = useContext(AuthContext);

    // console.log('Transaction');
    // console.log(props)
    const TransactionItem = ({item}) => {
        return (
            <View style={theme.darkMode ? styles.transaction_Dark : styles.transaction}>
                <View>
                    <Text style={theme.darkMode ? styles.categoryText_Dark : styles.categoryText}>{item.category}</Text>
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
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 2,
        borderRadius: 8,
        backgroundColor: '#E1E0E6', // headerContainer testing
        shadowOpacity: 1.8,
        shadowRadius: 1,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    transaction_Dark:{
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 2,
        borderRadius: 8,
        backgroundColor: '#23273C', // palette blue
        shadowOpacity: 1.8,
        shadowRadius: 1,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    categoryText:{
        paddingRight: 150,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#23273C', // pallete side bar
    },
    categoryText_Dark:{
        paddingRight: 150,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E1E0E6', // palette Date
    },
    amountText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E15460' // palette red
    } 
});

export default Transaction;