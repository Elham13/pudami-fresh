import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PhoneInput from "react-native-phone-number-input";
import { useDispatch } from 'react-redux'
import { Divider } from 'react-native-paper';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Shipping = () => {

    const [phoneValue, setPhoneValue] = useState("9346240703");
    const dispatch = useDispatch();

    const handleShippingClick = () => {
        dispatch({ type: "SHOW_INFORMATION" })
    }

    useEffect(() => {
    }, [])

    return (
        <View>
            <View style={styles.information}>
                <View style={styles.info1}>
                    <TouchableOpacity onPress={() => dispatch({ type: 'SHOW_INFORMATION' })}>
                        <Text style={styles.txt1}>Information</Text>
                    </TouchableOpacity>
                    <FontAwesome name="angle-right" size={16} color="#555" />
                    <Text style={[styles.txt1, { color: "#039646" }]}>Shipping</Text>
                    <FontAwesome name="angle-right" size={16} color="#555" />
                    <TouchableOpacity onPress={() => dispatch({ type: 'SHOW_PAYMENT' })}>
                        <Text style={styles.txt1}>Payment</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.info2}>
                    <View style={styles.infoInner1}>
                        <Text style={styles.txt2}>Contact</Text>
                        <TouchableOpacity onPress={handleShippingClick}>
                            <Text style={styles.txtBtn}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txt3}>wolverine.elham@gmail.com</Text>
                    <Divider style={styles.divider} />
                    <View style={styles.infoInner1}>
                        <Text style={styles.txt2}>Ship to</Text>
                        <TouchableOpacity onPress={handleShippingClick}>
                            <Text style={styles.txtBtn}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txt3}>Banjara Hills, Road no 12, Global naila, 500034, Hyderabad TS, India</Text>
                </View>

                <Text>Shipping method</Text>
                <View style={styles.info2}>
                    <View style={styles.infoInner1}>
                        <Text style={styles.txt2}>Local delivery</Text>
                        <Text style={styles.txt3}>Free</Text>
                    </View>
                    <Text style={styles.txt4}>Free Home delivery on orders, No minimum order value.</Text>
                    <Divider style={styles.divider} />
                    <PhoneInput
                        // ref={phoneInput}
                        defaultValue={phoneValue}
                        defaultCode="IN"
                        onChangeFormattedText={(text) => {
                            setPhoneValue(text);
                        }}
                        withDarkTheme
                        withShadow
                        autoFocus
                        layout="first"
                        containerStyle={styles.textInputStyle}
                        textInputStyle={styles.textInputStyle}
                        codeTextStyle={styles.codeTextStyle}
                    />
                    <Text style={styles.txt4}>We may use your phone number to call or text you about your delivery</Text>
                    <TextInput
                        placeholder="Deliver instructions (optional)"
                        style={styles.input}
                    />
                    <Text style={styles.txt4}>Enter necessary information like door codes or package drop-off instructions</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.payBtn} onPress={() => dispatch({type: 'SHOW_PAYMENT'})}>
                <Text style={{ color: '#fff' }}>Continue to payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => dispatch({type: 'SHOW_INFORMATION'})}>
                <FontAwesome name="angle-left" size={16} color="#039646" />
                <Text style={[styles.txtBtn, { marginLeft: 10, }]}>Return to information</Text>
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
        </View>
    )
}

export default Shipping

const styles = StyleSheet.create({
    btn1: {
        marginHorizontal: 10,
    },
    txtBtn1: {
        color: '#039646',
        fontSize: 9,
    },
    links: {

    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
    input: {
        borderWidth: 0.7,
        padding: 0,
        borderRadius: 4,
        borderColor: '#ccc',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    codeTextStyle: {
        height: 25,
    },
    textInputStyle: {
        height: 40,
    },
    txt4: {
        fontSize: 10,
        color: '#888'
    },
    divider: {
        height: 1,
        marginVertical: 5,
    },
    txt3: {
        color: '#222',
        fontSize: 12,
        marginTop: 2,
    },
    txtBtn: {
        color: '#039646',
        fontSize: 12,
    },
    info2: {
        borderColor: '#999',
        borderRadius: 2,
        padding: 8,
        borderWidth: 0.5,
        marginVertical: 10,

    },
    txt2: {
        color: '#666',
        fontSize: 12,
    },
    infoInner1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txt1: {
        fontSize: 12,
        marginHorizontal: 5,
        color: '#555'
    },
    information: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 6,
    },
    container: {
        flex: 1,
        backgroundColor: '#ccc',
    },
    logoWrapper: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 2,
    },
    logo: {
        width: windowWidth,
        height: 80,
        resizeMode: 'contain',
    },
    list: {
        backgroundColor: 'orange',
        padding: 0,
        fontSize: 11
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
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    sumTxt: {
        fontWeight: '700',
        fontSize: 12,
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 3,
        borderWidth: 0.3,
        borderColor: '#000'
    },
    summary: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 2,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 2,
    },
    item1: {
        flexDirection: 'row',
        alignItems: 'center'
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
    itemName: {
        color: '#222',
        fontWeight: '700',
        fontSize: 12,
        marginLeft: 10,
    },
    itemPrice: {
        color: '#222',
        fontWeight: '700',
        fontSize: 12
    },
    section: {
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        paddingTop: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
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
    info1: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
