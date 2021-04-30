import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput, Alert } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux'
import { Divider, RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import RazorpayCheckout from 'react-native-razorpay';
import {TEST_KEY_ID, TEST_KEY_SECRET} from '../utils/razorpay'
import razorpayRequest from '../redux/orders/razorpayRequestAction'
import createOrder from '../redux/orders/createOrederAction'

const windowWidth = Dimensions.get('window').width;

const Payment = ({nav}) => {

    const addToCartReducer = useSelector(state => state.addToCart);
    const {cart} = addToCartReducer;
    const razorPayReducer = useSelector(state => state.razorpay)
    const {razorpayLoading, razorpayData, razorpayError} = razorPayReducer;

    const [paymentMode, setPaymentMode] = useState('onlinePayment');
    const [billingAddress, setBillingAddress] = useState("sameAsBilingAddress");
    const [fullOrderInfo, setFullOrderInfo] = useState({});

    const infoClickHandler = () => dispatch({ type: "SHOW_INFORMATION" })
    const shippingClickHandler = () => dispatch({type: 'SHOW_SHIPPING'})

    const getTotal = products => {
        let total = 0;
        products.map(p => {
          total += p.totalPrice;
        });
        return total;
    };

    const paymentHandler = async () => {
        if(Object.keys(fullOrderInfo).length){
            const updatedOrderInfo = {
                ...fullOrderInfo,
                paymentMethod: {
                    payment: paymentMode,
                    billingAddress: billingAddress
                },
            }
            setFullOrderInfo(updatedOrderInfo)
            try {
                await AsyncStorage.setItem("OrderInfo", JSON.stringify(updatedOrderInfo))
            } catch (error) {
                console.log(error.message)
            }
        }

        // dispatch(razorpayRequest())
        Alert.alert("Rdirecting to pyament", "You will be redirected to payment now!", [{text: "Okay", onPress:() => openRazorPay()}])
    }
    
    const openRazorPay = () => {
            const  options = {
                image: 'https://i.imgur.com/3g7nmJC.png',
                name: 'Fresh Vegitables', 
                description: 'Happy shopping with Pudami Fresh',
                amount: getTotal(fullOrderInfo.orderItems) * 100,
                currency: 'INR',
                // order_id: razorpayData.id,
                key: TEST_KEY_ID,
                prefill: {
                  email: 'wolverine.elham@gmail.com',
                  contact: '919346240703',
                  name: 'Elhamuddin Mahmoodin'
                },
                theme: {color: '#039646'}
              }
    
            RazorpayCheckout.open(options).then((data) => {
            // handle success
            dispatch(createOrder(fullOrderInfo)) 
            dispatch({type: 'EMPTY_CART'})
            nav.navigate("SuccessPayment", {orderInfo: fullOrderInfo});
            alert(`Payment was successfull: ${data.razorpay_payment_id}`);

            }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
            });
    }

    const dispatch = useDispatch();
    const handleShippingClick = () => {
        dispatch({ type: "SHOW_INFORMATION" })
    }

    useEffect(async() => {
        const orderInfo = await AsyncStorage.getItem("OrderInfo")
        if(orderInfo){
            console.log("Full: ",orderInfo);
            const orderInfo1 = JSON.parse(orderInfo)
            setFullOrderInfo(orderInfo1)
        }
    }, [])

    useEffect(() => {
        console.log("Method: ", paymentMode)
    }, [paymentMode])

    useEffect(() => {
        console.log("Object: ", fullOrderInfo)
    }, [])

    return (
        <View>
            {Object.keys(fullOrderInfo).length > 0 && (
                <>
            <View style={styles.information}>
                <View style={styles.info1}>
                    <TouchableOpacity onPress={infoClickHandler}>
                        <Text style={styles.txt1}>Information</Text>
                    </TouchableOpacity>
                    <FontAwesome name="angle-right" size={16} color="#555" />
                    <TouchableOpacity onPress={shippingClickHandler}>
                        <Text style={styles.txt1}>Shipping</Text>
                    </TouchableOpacity>
                    <FontAwesome name="angle-right" size={16} color="#555" />
                    <Text style={[styles.txt1, { color: "#039646" }]}>Payment</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.infoInner1}>
                        <Text style={styles.txt2}>Contact</Text>
                        <TouchableOpacity onPress={handleShippingClick}>
                            <Text style={styles.txtBtn}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txt3}>{fullOrderInfo.informationAddress.contact}</Text>
                    <Divider style={styles.divider} />
                    <View style={styles.infoInner1}>
                        <Text style={styles.txt2}>Ship to</Text>
                        <TouchableOpacity onPress={handleShippingClick}>
                            <Text style={styles.txtBtn}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txt3}>{fullOrderInfo.informationAddress.address}</Text>
                    <Divider style={styles.divider} />
                    <View style={styles.infoInner1}>
                        <Text style={styles.txt2}>Method</Text>
                    </View>
                    <Text style={styles.txt3}>Local Delivery - <Text style={{color: '#000', fontWeight: '700'}}>Free</Text></Text>
                </View>
                
                <Text>Payment</Text>
                <Text style={styles.txt2}>All transactions are secure and encrypted.</Text>
                <View style={[styles.section, {padding: 0}]}>
                    <View style={styles.subsection}>
                        <RadioButton.Group onValueChange={newVal => setPaymentMode(newVal)} value={paymentMode}>
                            <View style={{paddingBottom: 4}}>
                                <View style={styles.left}>
                                    <RadioButton value="onlinePayment" />
                                    <Text style={styles.txt3}>Credit Card / Debit Card / Net Banking / UPI</Text>
                                </View>
                                <View style={styles.iconsWrapper}>
                                    <Image style={styles.iconImg} source={require('../assets/visa.png')} />
                                    <Image style={styles.iconImg} source={require('../assets/mastercard.png')} />
                                    <Image style={styles.iconImg} source={require('../assets/amex.png')} />
                                    <Image style={styles.iconImg} source={require('../assets/paypal.png')} />
                                    <Text style={{fontSize: 8}}>and more...</Text>
                                </View>
                            </View>
                            {paymentMode == "onlinePayment" && (
                                <View style={styles.sectionInner}>
                                    <FontAwesome name="credit-card" size={40} color="#777" />
                                    <Text style={styles.txt1}>After clicking "Complete order", you will be redirected to Online payment page to complete your purchase securely.</Text>
                                </View>
                            )}
                            
                            <View style={styles.left}>
                                <RadioButton value='COD' />
                                <Text style={styles.txt3}>Cash on delivery</Text>
                            </View>
                            {paymentMode == 'COD' && (
                                <View style={styles.sectionInner}>
                                    <FontAwesome name="credit-card" size={40} color="#777" />
                                    <Text style={styles.txt1}>After clicking "Complete order", you will be redirected to Cash on deliver page to complete your purchase securely.</Text>
                                </View>
                            )}
                        </RadioButton.Group>
                    </View>
                </View>

                <Text>Billing Address</Text>
                <Text style={styles.txt2}>Select the address that matches your card or payment method.</Text>
                <View style={[styles.section, {padding: 0}]}>
                    <RadioButton.Group onValueChange={newValue => setBillingAddress(newValue)} value={billingAddress}>
                        <View style={[styles.left, {borderBottomWidth: 0.8, borderColor: '#999'}]}>
                            <RadioButton value="sameAsBilingAddress" />
                            <Text style={styles.txt3}>Same as shipping address</Text>
                        </View>
                    </RadioButton.Group>
                </View>

            </View>

            <TouchableOpacity style={styles.payBtn} onPress={paymentHandler} >
                <Text style={{ color: '#fff' }}>Complete order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => dispatch({type: 'SHOW_SHIPPING'})}>
                <FontAwesome name="angle-left" size={16} color="#039646" />
                <Text style={[styles.txtBtn, { marginLeft: 10, }]}>Return to Shipping</Text>
            </TouchableOpacity>

            <Divider style={styles.divider} />

            <View style={styles.links}>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.btn1}>
                        <Text style={styles.txtBtn1}>Refund policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn1}>
                        <Text style={styles.txtBtn1}>Shipping policy</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn1}>
                    <Text style={styles.txtBtn1}>By checking the sign-up box for text message offer and clicking "Continue to payment", I consent to receive recuring automated marketing text messages from www.pudamifresh.com at the number provide, and I agree that texts may be sent using an auto dialer or other technology. Consent is not a condition of purchase. Text STOP to cancel, HELP for help. Message and data rates may apply. For more information see Terms of Service & Privacy policy </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 10 }}>
                    <Text style={styles.txtBtn1}>Terms of Service </Text>
                </TouchableOpacity>
            </View>
            </>
            )}
        </View>
    )
}

export default Payment;

const styles = StyleSheet.create({
    information: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    info1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt1: {
        fontSize: 12,
        marginHorizontal: 5,
        color: '#555'
    },
    section: {
        padding: 10,
        borderWidth: 0.8,
        borderColor: '#aaa',
        borderRadius: 3,
        marginVertical: 10,
    },
    infoInner1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txt2: {
        color: '#666',
        fontSize: 12,
    },
    txtBtn: {
        color: '#039646',
        fontSize: 12,
    },
    txt3: {
        color: '#222',
        fontSize: 12,
        marginTop: 2,
    },
    divider: {
        height: 1,
        marginVertical: 5,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconsWrapper: {
        flexDirection: 'row',
        paddingLeft: 40,
        alignItems: 'center'
    },
    iconImg: {
        resizeMode: 'contain',
        height: 20,
        width: 40
    },
    sectionInner: {
        backgroundColor: '#ececec',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    input1: {
        height: 30,
        fontSize: 13,
        marginVertical: 3,
        marginHorizontal: 5,
    },
    payBtn: {
        backgroundColor: '#039646',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 4,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn1: {
        marginHorizontal: 10,
    },
    txtBtn1: {
        color: '#039646',
        fontSize: 9,
    },
    inputWrapper: {
        marginTop: 20,
      },
      inputTxt: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: -12,
        left: 17,
        zIndex: 1,
        paddingHorizontal: 5,
        fontWeight: '700',
        fontSize: 12,
      },
      input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        borderColor: '#039646',
      },
})
