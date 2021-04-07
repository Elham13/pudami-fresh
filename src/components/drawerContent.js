import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DrawerContent = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image style={styles.img} source={require('../assets/pudami-logo.jpeg')} />
            </View>
            <View style={styles.btnWrapper}>
                <View style={styles.drawerSection}>
                    <TouchableOpacity style={styles.drawerNav} onPress={() => navigation.navigate('Cart')}>
                        <View style={styles.navTxtWrapper}>
                            <MaterialIcons name="circle" size={10} color="#333" />
                            <Text style={styles.navTxt}>You Orders</Text>
                        </View>
                        <MaterialIcons name="double-arrow" size={10} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerNav} onPress={() => navigation.navigate('Cart')}>
                        <View style={styles.navTxtWrapper}>
                            <MaterialIcons name="circle" size={10} color="#333" />
                            <Text style={styles.navTxt}>Products</Text>
                        </View>
                        <MaterialIcons name="double-arrow" size={10} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc'
    },
    top: {
        backgroundColor: '#fff'
    },
    img: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
    },
    drawerSection: {
        marginTop: 5,
        backgroundColor: '#fff'
    },
    drawerNav: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    navTxtWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    navTxt: {
        fontSize: 11,
        marginLeft: 5,
    },
    btnWrapper: {
        borderTopWidth: 0.5,
        borderTopColor: '#999'
    }
})
