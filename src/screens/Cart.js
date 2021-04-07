import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Cart = ({navigation}) => {

    navigation.setOptions({
        headerTitle: () => <Header nav={navigation} title="Cart" showNav={false} info="3 Items" />,
        headerStyle: {backgroundColor: '#039646'},
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome5 name='angle-left' size={20} style={styles.icon} />
            </TouchableOpacity>
        )
    })

    const handleCheckout = () => {
        navigation.navigate('Checkout')
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.product}>
                    <View style={styles.inner}>
                        <Image style={styles.img} source={require('../assets/pudami-logo.jpeg')} />
                        <View style={styles.info}>
                            <Text style={styles.name}>Potato</Text>
                            <Text style={styles.name}>150 kg</Text>
                            <Text style={styles.price}>&#8377;80/kg</Text>
                        </View>
                    </View>
                    <Icon name="times" size={18} style={styles.icon} />
                </View>

                <View style={styles.priceDetails}>
                    <Text style={styles.heading}>Price details</Text>
                    <View style={styles.infoWrapper}>
                        <View style={styles.infoInner}>
                            <Text style={styles.txtLeft}>Subtotal</Text>
                            <Text style={styles.txtRight}>&#8377;12000</Text>
                        </View>
                        <View style={styles.infoInner}>
                            <Text style={styles.txtLeft}>Shipping</Text>
                            <Text style={styles.txtRight}>Calculated at next step</Text>
                        </View>
                        <View style={styles.infoInner}>
                            <Text style={styles.txtLeft}>Taxes</Text>
                            <Text style={styles.txtRight}>Calculated at next step</Text>
                        </View>
                    </View>
                    <View style={styles.infoInner}>
                            <Text style={styles.txtLeft}>Total</Text>
                            <Text style={styles.txtRight}>&#8377;12000</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={[styles.btn, {backgroundColor: 'transparent'}]}>
                    <Text style={[styles.txt, {color: '#e68a00'}]}>&#8377;12000</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCheckout} style={[styles.btn, {width: 236}]}>
                    <Text style={styles.txt}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
    },
    product: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 4,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    img: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
    info: {
        marginLeft: 10,
    },
    name: {
        fontSize: 10,
        color: '#333',
    },
    price: {
        fontWeight: '700',
        fontSize: 10
    },
    icon: {
        marginTop: 5,
        paddingHorizontal: 10,
        color: '#333',
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    priceDetails: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 4,
    },
    heading: {
        color: '#e68a00',
        fontSize: 12,
        fontWeight: '700',
        borderBottomColor: '#e68a00',
        borderBottomWidth: 1,
        width: '40%'
    },
    infoWrapper: {
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        paddingVertical: 2,
    },
    infoInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 3,
    },
    txtLeft: {
        fontSize: 11,
        fontWeight: '700',
        color: "#333",
    },
    txtRight: {
        fontSize: 11,
    },
    btnWrapper: {
        paddingVertical: 5,
        position: 'absolute',
        width: windowWidth,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    btn: {
        backgroundColor: '#039646',
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'center',
    },
    txt: {
        fontWeight: '700',
        color: '#fff',
    },
    icon: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#f1f1f1'
    }
})