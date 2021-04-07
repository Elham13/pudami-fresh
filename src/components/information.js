import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux'
import { Divider, RadioButton, TextInput } from 'react-native-paper';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Information = () => {
    const dispatch = useDispatch();

    const [showOrder, setShowOrder] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState("ship");
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
    const handleClick = () => {
        setShowOrder(!showOrder)
    }


    useEffect(() => {
        console.log(deliveryMethod)
    }, [deliveryMethod])

    return (
        <View>
            <View style={styles.information}>
                <View style={styles.info1}>
                    <Text style={[styles.txt1, { color: "#039646" }]}>Information</Text>
                    <FontAwesome name="angle-right" size={16} color="#555" />
                    <TouchableOpacity onPress={() => dispatch({ type: 'SHOW_SHIPPING' })}>
                        <Text style={styles.txt1}>Shipping</Text>
                    </TouchableOpacity>
                    <FontAwesome name="angle-right" size={16} color="#555" />
                    <TouchableOpacity onPress={() => dispatch({ type: 'SHOW_PAYMENT' })}>
                        <Text style={styles.txt1}>Payment</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ marginTop: 10 }}>Contact information</Text>
                <View style={styles.contactWrapper}>
                    <Image style={styles.img1} source={require('../assets/pudami-logo.jpeg')} />
                    <View>
                        <Text style={styles.txt2}>Elhamuddin Mahmoodi</Text>
                        <Text style={styles.txt2}>(wolverine.elham@gmail.com)</Text>
                        <TouchableOpacity>
                            <Text style={styles.txtBtn}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ marginVertical: 10 }}>Delivery method</Text>
                <View style={styles.info3}>
                    <RadioButton.Group onValueChange={newValue => setDeliveryMethod(newValue)} value={deliveryMethod}>
                        <View style={[styles.left, { borderWidth: 0.5, borderColor: "#aaa", borderTopRightRadius: 4, borderTopLeftRadius: 4 }]}>
                            <RadioButton value="ship" />
                            <Material name="truck-check" size={18} />
                            <Text style={{ marginHorizontal: 5, }}>Ship</Text>
                        </View>
                        <View style={[styles.left, { borderWidth: 0.5, borderColor: "#aaa", borderBottomRightRadius: 4, borderBottomLeftRadius: 4 }]}>
                            <RadioButton value="pickup" />
                            <FontAwesome name="gift" size={18} />
                            <Text style={{ marginHorizontal: 5, }}>Pick up</Text>
                        </View>
                    </RadioButton.Group>
                </View>

                {deliveryMethod == "ship" ? (
                    <View>
                        <Text style={{ marginTop: 10 }}>Shipping Address</Text>
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
                ) : (
                    <View>
                        <Text style={{ marginTop: 10 }}>Pickup location</Text>
                        <View style={{ padding: 20, backgroundColor: '#ccc' }}>
                            <Text>Your order is not available for pickup. Please enter a shipping address</Text>
                        </View>
                    </View>
                )}

            </View>

            <TouchableOpacity style={styles.payBtn} onPress={() => dispatch({ type: 'SHOW_SHIPPING' })}>
                <Text style={{ color: '#fff' }}>Continue to Shipping</Text>
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

export default Information

const styles = StyleSheet.create({
    input1: {
        height: 30,
        fontSize: 13,
        marginVertical: 3,
    },
    contactWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    img1: {
        width: 40,
        height: 40,
        borderWidth: 0.5,
        borderColor: '#888',
        borderRadius: 100 / 2,
        marginRight: 10,
    },
    btn1: {
        marginHorizontal: 10,
    },
    txtBtn1: {
        color: '#039646',
        fontSize: 9,
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
    divider: {
        height: 1,
        marginVertical: 5,
    },
    txtBtn: {
        color: '#039646',
        fontSize: 12,
    },
    txt2: {
        color: '#666',
        fontSize: 12,
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
