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
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 35,
        margin: 1,
        backgroundColor: '#E1E0E6', // headerContainer testing
        shadowOpacity: 0.5,
        shadowRadius: .5,
        shadowOffset: {
            width: 0,
            height: .5
        }
    },
    transaction_Dark:{
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 35,
        margin: 1,
        //backgroundColor: '#23273C', // palette blue
        //backgroundColor: '#0c0c0c', // dark 2
        //backgroundColor: '#27282e', // dark 3
        backgroundColor: '#0b0d12', // dark 4
        shadowOpacity: 0.5,
        shadowRadius: .5,
        shadowOffset: {
            width: 0,
            height: .5
        }
    },
    categoryText:{
        paddingRight: 180,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#23273C', // pallete side bar
    },
    categoryText_Dark:{
        paddingRight: 180,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E1E0E6', // palette Date
        //color: '#fff', // dark 2
    },
    amountText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E15460' // palette red
    } 
});

export default Transaction;