import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PhoneInput from "react-native-phone-number-input";
import { useDispatch } from 'react-redux'
import { Divider, RadioButton, TextInput } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

const Payment = () => {

    const [phoneValue, setPhoneValue] = useState("9346240703");
    const [cod, setCOD] = useState(false);
    const [billingAddress, setBillingAddress] = useState(false);

    const [savedAddress, setSavedAddress] = useState('Banjara Hills, Roud no 12, Global naila, 500034, Hyderabad TS, India');
    const [firstName, setFirstName] = useState('Elhamuddin');
    const [lastName, setLastName] = useState('Mahmoodi');
    const [address, setAddress] = useState('Banjara Hills');
    const [apartment, setApartment] = useState('Global naila');
    const [city, setCity] = useState('Hyderabad');
    const [country, setCountry] = useState('India');
    const [state, setState] = useState('Telangana');
    const [pincode, setPincode] = useState('500034');
    const [phoneNo, setPhoneNo] = useState('9346240703');

    const dispatch = useDispatch();
    const handleShippingClick = () => {
        dispatch({ type: "SHOW_INFORMATION" })
    }

    return (
        <View>
            <View style={styles.information}>
                <View style={styles.info1}>
                    <TouchableOpacity onPress={() => dispatch({ type: 'SHOW_INFORMATION' })}>
                        <Text style={styles.txt1}>Information</Text>
                    </TouchableOpacity>
                    <FontAwesome name="angle-right" size={16} color="#555" />
                    <TouchableOpacity onPress={() => dispatch({ type: 'SHOW_SHIPPING' })}>
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
                    <Text style={styles.txt3}>wolverine.elham@gmail.com</Text>
                    <Divider style={styles.divider} />
                    <View style={styles.infoInner1}>
                        <Text style={styles.txt2}>Ship to</Text>
                        <TouchableOpacity onPress={handleShippingClick}>
                            <Text style={styles.txtBtn}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txt3}>Banjara Hills, Road no 12, Global naila, 500034, Hyderabad TS, India</Text>
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
                        <RadioButton.Group onValueChange={newValue => setCOD(newValue)} value={cod}>
                            <View style={{paddingBottom: 4}}>
                                <View style={styles.left}>
                                    <RadioButton value={false} />
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
                            {!cod ? (
                                <View style={styles.sectionInner}>
                                    <FontAwesome name="credit-card" size={40} color="#777" />
                                    <Text style={styles.txt1}>After clicking "Complete order", you will be redirected to Online payment page to complete your purchase securely.</Text>
                                </View>
                            ): null}
                            
                            <View style={styles.left}>
                                <RadioButton value={true} />
                                <Text style={styles.txt3}>Cash on delivery</Text>
                            </View>
                            {cod ? (
                                <View style={styles.sectionInner}>
                                    <FontAwesome name="credit-card" size={40} color="#777" />
                                    <Text style={styles.txt1}>After clicking "Complete order", you will be redirected to Cash on deliver page to complete your purchase securely.</Text>
                                </View>
                            ): null}
                        </RadioButton.Group>
                    </View>
                </View>

                <Text>Billing Address</Text>
                <Text style={styles.txt2}>Select the address that matches your card or payment method.</Text>
                <View style={[styles.section, {padding: 0}]}>
                    <RadioButton.Group onValueChange={newValue => setBillingAddress(newValue)} value={billingAddress}>
                        <View style={[styles.left, {borderBottomWidth: 0.8, borderColor: '#999'}]}>
                            <RadioButton value={false} />
                            <Text style={styles.txt3}>Same as shipping address</Text>
                        </View>
                        <View style={styles.left}>
                            <RadioButton value={true} />
                            <Text style={styles.txt3}>Use a different billing address</Text>
                        </View>
                        {billingAddress ? (
                             <View>
                             <TextInput
                                 label="Saved address"
                                 value={savedAddress}
                                 onChangeText={text => setSavedAddress(text)}
                                 selectionColor="#039646"
                                 underlineColor="#039646"
                                 style={styles.input1}
                                 mode="outlined"
                             />
                             <TextInput
                                 label="First name"
                                 value={firstName}
                                 onChangeText={text => setFirstName(text)}
                                 selectionColor="#039646"
                                 underlineColor="#039646"
                                 style={styles.input1}
                                 mode="outlined"
                             />
                             <TextInput
                                 label="Last name"
                                 value={lastName}
                                 onChangeText={text => setLastName(text)}
                                 selectionColor="#039646"
                                 underlineColor="#039646"
                                 style={styles.input1}
                                 mode="outlined"
                             />
                             <TextInput
                                 label="Address"
                                 value={address}
                                 onChangeText={text => setAddress(text)}
                                 selectionColor="#039646"
                                 underlineColor="#039646"
                                 style={styles.input1}
                                 mode="outlined"
                             />
                             <TextInput
                                 label="Apartment, suite, etc."
                                 value={apartment}
                                 onChangeText={text => setApartment(text)}
                                 selectionColor="#039646"
                                 underlineColor="#039646"
                                 style={styles.input1}
                                 mode="outlined"
                             />
                             <TextInput
                                 label="City"
                                 value={city}
                                 onChangeText={text => setCity(text)}
                                 selectionColor="#039646"
                                 underlineColor="#039646"
                                 style={styles.input1}
                                 mode="outlined"
                             />
                             <TextInput
                                 label="Country/Region"
                                 value={country}
                                 onChangeText={text => setCountry(text)}
                                 selectionColor="#039646"
                                 underlineColor="#039646"
                                 style={styles.input1}
                                 mode="outlined"
                             />
                             <TextInput
                                 label="State"
                                 value={state}
                                 onChangeText={text => setState(text)}
                                 selectionColor="#039646"
                                 underlineColor="#039646"
                                 style={styles.input1}
                                 mode="outlined"
                             />
                             <TextInput
                                 label="PIN code"
                                 value={pincode}
                                 onChangeText={text => setPincode(text)}
                                 selectionColor="#039646"
                                 underlineColor="#039646"
                                 style={styles.input1}
                                 mode="outlined"
                             />
                             <TextInput
                                 label="Phone no for updates and exclusive offers"
                                 value={phoneNo}
                                 onChangeText={text => setPhoneNo(text)}
                                 selectionColor="#039646"
                                 underlineColor="#039646"
                                 style={styles.input1}
                                 mode="outlined"
                             />
                         </View>
                        ): null}
                       
                    </RadioButton.Group>
                </View>

            </View>

            <TouchableOpacity style={styles.payBtn} >
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
})
