import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Badge} from 'react-native-paper';
import { useSelector } from 'react-redux'; 

const header = ({nav, title, showNav, info, hideCart}) => {
    const addToCartReducer = useSelector(state => state.addToCart)
    const {cart} = addToCartReducer;

    const handleClick = () => {
        nav.openDrawer()
    }

    const handleCart = () => {
        nav.navigate("Cart")
    }

    return (
        <View style={styles.container}>
                {showNav ? (
                    <Icon style={styles.icon} name="menu" size={20} color="#f1f1f1" onPress={handleClick} />
                ): null}
                <Text style={styles.title}>{title}</Text>
            <View style={styles.right}>
                {info ? (
                    <Text style={styles.info}>{info}</Text>
                ) : null}
                {!hideCart ? (
                    <TouchableOpacity style={styles.btn} onPress={handleCart}>
                        {cart.length ? 
                            (<Badge size={15} visible={true} style={styles.badge}>{cart.length}</Badge>)
                            : null
                        }
                        
                        <Icon name='shopping-cart' size={18} color="orange" />
                    </TouchableOpacity>
                ): null}
            </View>
        </View>
    )
}

export default header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: '700',
        fontSize: 16,
        color: '#f1f1f1',
        marginLeft: 10,
    },
    btn:{
        marginHorizontal: 2,
        padding: 8,
    },
    badge: {
        position: 'absolute',
        zIndex: 2,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    info: {
        fontSize: 11,
        fontWeight: '700',
        color: '#f1f1f1'
    },
    icon: {
        padding: 10,
        marginLeft: -15,
    }
})
