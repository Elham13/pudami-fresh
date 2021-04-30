import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const addToCartReducer = useSelector(state => state.addToCart);
  const {cart} = addToCartReducer;
  const [totalPrice, setTotalPrice] = useState(0)
  const [user, setUser] = useState({})


  const handleCheckout = () => {
    if(Object.keys(user).length){
      navigation.navigate('Checkout', {user});
    }else{
      Alert.alert("Alert", "You are not logged in, Please log in!", [{
        text: "Okay",
        onPress: () => navigation.navigate('Login', {source: 'Cart'})
      }])
    }
  };

  const getTotal = (products) => {
    let total = 0;
    products.map(p => {
      total += p.totalPrice
    })
    return total
  }

  const handleRemove = (item) => {
    dispatch({type: 'REMOVE_FROM_CART', payload: {pId: item.id}})
    setTotalPrice(getTotal(cart))
  }

  useEffect(() => {
    setTotalPrice(getTotal(cart))
  }, [cart])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Header
          nav={navigation}
          title="Cart"
          showNav={false}
          info={`${cart.length} items`}
        />
      ),
      headerStyle: {backgroundColor: '#039646'},
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="angle-left" size={20} style={styles.icon} />
        </TouchableOpacity>
      ),
    });
  }, [totalPrice])

  useEffect(async() => {
    const item = await AsyncStorage.getItem("User");
    if(item) {
      setUser(JSON.parse(item))
    }
  }, [])

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <View>
        <FlatList 
        data={cart}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.product}>
          <View style={styles.inner}>
            <Image
              style={styles.img}
              source={{uri: item.image}}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.name}>&#8377;{item.price}/kg</Text>
              <Text style={styles.name}>{item.qty} kg</Text>
              <Text style={styles.price}>&#8377;{item.totalPrice}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => handleRemove(item)}>
            <Icon name="times" size={18} style={styles.icon1} />
          </TouchableOpacity>
        </View>
        )}
      />
       

        <View style={styles.priceDetails}>
          <Text style={styles.heading}>Price details</Text>
          <View style={styles.infoWrapper}>
            <View style={styles.infoInner}>
              <Text style={styles.txtLeft}>Subtotal</Text>
              <Text style={styles.txtRight}>&#8377;{totalPrice}</Text>
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
            <Text style={styles.txtRight}>&#8377;{totalPrice}</Text>
          </View>
        </View>


      <View style={styles.btnWrapper}>
        <View
          style={[styles.btn, {backgroundColor: 'transparent'}]}>
          <Text style={[styles.txt, {color: '#039646'}]}>&#8377;{totalPrice}</Text>
        </View>
        <TouchableOpacity
          onPress={handleCheckout}
          style={[styles.btn, {width: 236}]}>
          <Text style={styles.txt}>Checkout</Text>
        </TouchableOpacity>
      </View>
      </View>
      ): <Text>Empty</Text>}
      
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
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
    resizeMode: 'contain',
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
    fontSize: 10,
  },
  icon1: {
    marginTop: 5,
    paddingHorizontal: 10,
    color: '#333',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '40%',
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
    color: '#333',
  },
  txtRight: {
    fontSize: 11,
  },
  btnWrapper: {
    paddingVertical: 5,
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
    color: '#f1f1f1',
  },
});
