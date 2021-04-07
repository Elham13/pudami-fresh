import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Badge} from 'react-native-paper';

const header = ({nav, title, showNav, info, hideCart}) => {
    const handleClick = () => {
        nav.openDrawer()
    }

    const handleCart = () => {
        nav.navigate("Cart")
    }
    return (
        <View style={styles.container}>
                {showNav ? (
                    <Icon name="menu" size={20} color="#f1f1f1" onPress={handleClick} />
                ): null}
                <Text style={styles.title}>{title}</Text>
            <View style={styles.right}>
                {info ? (
                    <Text style={styles.info}>{info}</Text>
                ) : null}
                {!hideCart ? (
                    <TouchableOpacity style={styles.btn} onPress={handleCart}>
                        <Badge size={15} visible={false} style={styles.badge}>3</Badge>
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
    }
})
