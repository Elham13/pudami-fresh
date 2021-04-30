import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Divider, RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createOrder from '../redux/orders/createOrederAction'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Information = ({user, cart}) => {
  const dispatch = useDispatch();

  const [deliveryMethod, setDeliveryMethod] = useState('ship');
  const [savedAddress, setSavedAddress] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [landmark, setLandmark] = useState('');
  const [email, setEmail] = useState("");
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [fullOrderInfo, setFullOrderInfo] = useState({});

  const shippingClickHandler = () => dispatch({type: 'SHOW_SHIPPING'});
  const paymentClickHandler = () => dispatch({type: 'SHOW_PAYMENT'});

  const logoutHandler = async () => {
    if(Object.keys(user).length > 0){
        await AsyncStorage.removeItem("User");
        dispatch({type: 'LOGOUT'});
    }
    navigation.navigate('Login')
  }

  const handleSubmit = async() => {
      if(!firstName.length || !lastName.length || !savedAddress.length || !email.length || !city.length || !state.length || !country.length || !phoneNo.length) {
          Alert.alert("Input required", "Please fill all inputs", [{text: "Okay"}])
      }else{
        if(Object.keys(fullOrderInfo).length){
          var orderObj = {
            token: user.token,
            orderItems: cart,
            informationAddress: {
              contact: email,
              firstName,
              lastName,
              address: savedAddress,
              nearTo: landmark,
              city,
              state,
              pincode,
              country,
              phone: phoneNo,
            },
            shippingAddress: fullOrderInfo.shippingAddress,
            paymentMethod: fullOrderInfo.paymentMethod,
            isPaid: false,
            paidAt: '',
          }
        }else{
          var orderObj = {
            token: user.token,
            orderItems: cart,
            informationAddress: {
              contact: email,
              firstName,
              lastName,
              address: savedAddress,
              nearTo: landmark,
              city,
              state,
              pincode,
              country,
              phone: phoneNo,
            },
            shippingAddress: {},
            paymentMethod: {},
            isPaid: false,
            paidAt: '',
          }
        }
        
        try {
          await AsyncStorage.setItem("OrderInfo", JSON.stringify(orderObj));
        } catch (error) {
          console.log(error)
        }
        
          dispatch({type: 'SHOW_SHIPPING'})
      }
  }

  useEffect(async() => {
    const orderInfo = await AsyncStorage.getItem("OrderInfo");
    // console.log("Address: ", address)
    if(orderInfo){
      const orderInfo1 = JSON.parse(orderInfo)
      setFullOrderInfo(orderInfo1)
      const add = orderInfo1.informationAddress
      setSavedAddress(add.address)
      setFirstName(add.firstName)
      setLastName(add.lastName)
      setEmail(add.contact)
      setPhoneNo(add.phone)
      setLandmark(add.nearTo)
      setCity(add.city)
      setState(add.state)
      setPincode(add.pincode)
      setCountry(add.country)
    }
  }, [])

  useEffect(async() => {
    await AsyncStorage.removeItem("InfoAddress");
    // console.log(deliveryMethod);
    // console.log("Cart: ", cart)
  }, []);

  return (
    <View> 
      <View style={styles.information}>
        <View style={styles.info1}>
          <Text style={[styles.txt1, {color: '#039646'}]}>Information</Text>
          <FontAwesome name="angle-right" size={16} color="#555" />
          <TouchableOpacity onPress={shippingClickHandler}>
            <Text style={styles.txt1}>Shipping</Text>
          </TouchableOpacity>
          <FontAwesome name="angle-right" size={16} color="#555" />
          <TouchableOpacity onPress={paymentClickHandler}>
            <Text style={styles.txt1}>Payment</Text>
          </TouchableOpacity> 
        </View>

        <Text style={{marginTop: 10}}>Contact information</Text>
        <View style={styles.contactWrapper}>
          <Image
            style={styles.img1}
            source={require('../assets/pudami-logo.jpeg')}
          />
          <View>
            <Text style={styles.txt2}>{user.name}</Text>
            <Text style={styles.txt2}>({user.email})</Text>
            <TouchableOpacity onPress={logoutHandler}>
              <Text style={styles.txtBtn}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{marginVertical: 10}}>Delivery method</Text>
        <View style={styles.info3}>
          <RadioButton.Group
            onValueChange={newValue => setDeliveryMethod(newValue)}
            value={deliveryMethod}>
            <View
              style={[
                styles.left,
                {
                  borderWidth: 0.5,
                  borderColor: '#aaa',
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                },
              ]}>
              <RadioButton value="ship" />
              <Material name="truck-check" size={18} />
              <Text style={{marginHorizontal: 5}}>Ship</Text>
            </View>
            <View
              style={[
                styles.left,
                {
                  borderWidth: 0.5,
                  borderColor: '#aaa',
                  borderBottomRightRadius: 4,
                  borderBottomLeftRadius: 4,
                },
              ]}>
              <RadioButton value="pickup" />
              <FontAwesome name="gift" size={18} />
              <Text style={{marginHorizontal: 5}}>Pick up</Text>
            </View>
          </RadioButton.Group>
        </View>

        {deliveryMethod == 'ship' ? (
          <View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Shipping address</Text>
              <TextInput
                style={styles.input}
                value={savedAddress}
                placeholder="Enter your full address"
                onChangeText={text => setSavedAddress(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>First name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                placeholder="Enter your first name"
                onChangeText={text => setFirstName(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Last name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                placeholder="Enter your last name"
                onChangeText={text => setLastName(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                placeholder="Enter your Email"
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Phone number</Text>
              <TextInput
                style={styles.input}
                value={phoneNo}
                placeholder="Enter your phone number"
                keyboardType="number-pad"
                onChangeText={text => setPhoneNo(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Landmark</Text>
              <TextInput
                style={styles.input}
                value={landmark}
                placeholder="Enter a landmark"
                onChangeText={text => setLandmark(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>City</Text>
              <TextInput
                style={styles.input}
                value={city}
                placeholder="Enter your city"
                onChangeText={text => setCity(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>State</Text>
              <TextInput
                style={styles.input}
                value={state}
                placeholder="Enter your state"
                onChangeText={text => setState(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Pincode</Text>
              <TextInput
                style={styles.input}
                value={pincode}
                placeholder="Enter your pincode"
                keyboardType="numeric"
                onChangeText={text => setPincode(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Country</Text>
              <TextInput
                style={styles.input}
                value={country}
                placeholder="Enter your country name"
                onChangeText={text => setCountry(text)}
              />
            </View>
          </View>
        ) : (
          <View>
            <Text style={{marginTop: 10}}>Pickup location</Text>
            <View style={{padding: 20, backgroundColor: '#ccc'}}>
              <Text>
                Please find our store and pick your orders anytime you want
              </Text>
            </View>
          </View>
        )}

      <TouchableOpacity
        style={styles.payBtn}
        onPress={handleSubmit}>
        <Text style={{color: '#fff'}}>Continue to Shipping</Text>
      </TouchableOpacity>
      </View>

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
          <Text style={styles.txtBtn1}>
            By checking the sign-up box for text message offer and clicking
            "Continue to payment", I consent to receive recuring automated
            marketing text messages from www.pudamifresh.com at the number
            provide, and I agree that texts may be sent using an auto dialer or
            other technology. Consent is not a condition of purchase. Text STOP
            to cancel, HELP for help. Message and data rates may apply. For more
            information see Terms of Service & Privacy policy{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{margin: 10}}>
          <Text style={styles.txtBtn1}>Terms of Service </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({
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
    justifyContent: 'center',
  },
  payBtn: {
    backgroundColor: '#039646',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    marginVertical: 5,
    marginTop: 20,
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
    color: '#555',
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
  img: {
    width: 40,
    height: 40,
    borderRadius: 3,
    borderWidth: 0.3,
    borderColor: '#000',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 2,
  },
  item1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  t1: {
    color: '#fff',
    fontSize: 11,
  },
  info1: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
