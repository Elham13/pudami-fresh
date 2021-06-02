import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Divider } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

const SuccessPayment = ({route, navigation}) => {
    const createOrderReducer = useSelector(state => state.createOrder)
    const {orderLoading, orderData, orderError} = createOrderReducer;
    const [showOrderSummary, setShowOrderSummary] = useState(false)
    const [orderInfo, setOrderInfo] = useState({})
    const [total, setTotal] = useState(0)


    const handleClick = () => {
        setShowOrderSummary(!showOrderSummary)
    }

    useEffect(() => {
        console.log("Loading: ", orderLoading)
        console.log("Data: ", orderData)
        console.log("Error: ", orderError)
        setOrderInfo(route.params.orderInfo)
        // setTotal()
        let totalPrice = 0
        route.params.orderInfo.orderItems.map(item => {
            totalPrice += item.totalPrice
        })
        setTotal(totalPrice)

        // console.log("Hey: ", orderInfo)
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.infoWrapper}>
                <TouchableOpacity onPress={handleClick} style={styles.btnWrapper}>
                    {!showOrderSummary ? (
                    <View style={styles.left}>
                        <FontAwesome5 name="shopping-cart" color="#039646" />
                        <Text style={styles.txt}>Show order summary</Text>
                        <FontAwesome5 name="angle-down" size={14} color="#039646" />
                    </View>
                    ) : (
                    <View style={styles.left}>
                        <FontAwesome5 name="shopping-cart" color="#039646" />
                        <Text style={styles.txt}>Hide order summary</Text>
                        <FontAwesome5 name="angle-up" size={14} color="#039646" />
                    </View>
                    )}
                    {/* <Text style={styles.sumTxt}>&#8377;{totalPrice.toFixed(2)}</Text> */}
                    <Text style={styles.sumTxt}>&#8377;{total}</Text>
                </TouchableOpacity>
                <ScrollView>
                {showOrderSummary && (
                    <View style={styles.summary}>
                        {Object.keys(orderInfo).length > 0 && (
                            <View style={styles.section}>
                                {orderInfo.orderItems.map((item, index) => (
                                    <View style={styles.item} key={index}>
                                        <View style={styles.item1}>
                                            <Image
                                                style={styles.img}
                                                // source={{uri: cartItem.image}}
                                                source={require('../assets/pudami-logo.jpeg')}
                                            />
                                            <Text style={styles.itemName}>
                                                {item.name}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.txtRight}>
                                            &#8377;{item.qty}/kg
                                            </Text>
                                            <Text style={styles.itemPrice}>
                                            &#8377;{item.totalPrice} 
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                )}

                <View style={styles.order}>
                    <View style={styles.order1}>
                        <FontAwesome5 name='check-circle' size={20} color="#039646" />
                        <View style={styles.orderInner}>
                            <Text style={styles.txtRight}>Order #2323099010912</Text>
                            <Text>Thank you Elhamuddin</Text>
                        </View>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.orderInner}>
                        <Text style={[styles.sumTxt, {marginTop: 10}]}>Your order is confirmed</Text>
                        <Text style={styles.txtRight}>You will recieve an order confirmation email shortly</Text>
                        <Text style={[styles.sumTxt, {marginTop: 10}]}>Delivery information: <Text style={styles.txtRight}>Free home delivery on orders. No minimum value</Text> </Text>
                        <Text style={[styles.txtRight, {marginTop: 10}]}>Thank you! your order will dispatch within an hour</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={[styles.orderInner, {marginTop: 10}]}>
                        <Text style={styles.txt1}>Customer Information</Text>
                        <Text style={[styles.sumTxt, {marginTop: 10}]}>Contact information</Text>
                        <Text style={styles.txtRight}>Email: a.b@gmail.com</Text>
                        <Text style={styles.txtRight}>Phone number: 963265645</Text>
                        <Text style={[styles.sumTxt, {marginTop: 10}]}>Shipping address</Text>
                        <Text style={styles.txtRight}>Sultan Zoi</Text>
                        <Text style={styles.txtRight}>Banjara hills road no 12</Text>
                        <Text style={styles.txtRight}>500356, Hyderabad, Telangana</Text>
                        <Text style={styles.txtRight}>India</Text>
                        <Text style={[styles.sumTxt, {marginTop: 10}]}>Shipping method</Text>
                        <Text style={styles.txtRight}>Local Delivery</Text>
                        <Text style={[styles.sumTxt, {marginTop: 10}]}>Payment mode</Text>
                        <View style={styles.order1}>
                            <FontAwesome5 name='credit-card' size={14} color="#039646" />
                            <Text style={[styles.txtRight, {marginLeft: 10}]}>&#8377;50000.00 online payment</Text>
                        </View>
                        <Text style={[styles.sumTxt, {marginTop: 10}]}>Billing address</Text>
                        <Text style={styles.txtRight}>Sultan Zoi</Text>
                        <Text style={styles.txtRight}>Banjara hills road no 12</Text>
                        <Text style={styles.txtRight}>500356, Hyderabad, Telangana</Text>
                        <Text style={styles.txtRight}>India</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.continue} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.btnTxt}>Continue shopping</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

export default SuccessPayment

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoWrapper: {
        paddingVertical: 10,
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt: {
        marginHorizontal: 5,
        fontSize: 12,
        color: '#039646',
    },
    txt1: {
        fontSize: 14,
        color: '#039646',
    },
    sumTxt: {
        fontWeight: '700',
        fontSize: 12,
    },
    summary: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 2,
    },
    section: {
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        paddingTop: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 2,
        marginVertical: 5,
        borderWidth: 0.4,
        borderColor: '#039646',
        paddingRight: 5,
    },
    item1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    absoluteCircle: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#777',
        paddingHorizontal: 5,
        borderRadius: 100 / 2,
        top: -6,
        left: 32,
    },
    t1: {
        color: '#fff',
        fontSize: 11,
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 3,
        borderWidth: 0.3,
        borderColor: '#000',
    },
    itemName: {
        color: '#222',
        fontWeight: '700',
        fontSize: 12,
        marginLeft: 10,
    },
    txtRight: {
        fontSize: 11,
        fontWeight: '500'
    },
    itemPrice: {
        color: '#222',
        fontWeight: '700',
        fontSize: 12,
    },
    order: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    order1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderInner: {
        marginLeft: 10,
    },
    divider: {
        height: 1,
        marginVertical: 5,
    },
    continue: {
        marginTop: 10,
        marginBottom: 30,
        backgroundColor: '#039646',
        marginHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    btnTxt: {
        color: '#fff',
        fontSize: 16,
    }
})
