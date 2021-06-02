import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity, 
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import Header from '../components/header';
import Information from '../components/information';
import Shipping from '../components/shipping';
import Payment from '../components/payment';

const windowWidth = Dimensions.get('window').width;

const Checkout = ({route ,navigation}) => {
  const [showOrder, setShowOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const checkoutRoutesReducer = useSelector(state => state.route);
  const {showInformation, showShipping, showPayment} = checkoutRoutesReducer;
  const addToCartReducer = useSelector(state => state.addToCart);
  const {cart} = addToCartReducer;

  const handleClick = () => {
    setShowOrder(!showOrder);
  };

  const getTotal = products => {
    let total = 0;
    products.map(p => {
      total += p.totalPrice;
    });
    return total;
  };

  useEffect(() => {
    setTotalPrice(getTotal(cart));

    navigation.setOptions({
      headerTitle: () => (
        <Header
          nav={navigation}
          title="Checkout"
          showNav={false}
          hideCart={true}
        />
      ),
      headerStyle: {backgroundColor: '#039646'},
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="angle-left" size={20} style={styles.icon} />
        </TouchableOpacity>
      ),
    });

    // console.log("Params: ", route.params)
  }, []);
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logo}
              source={require('../assets/pudami-logo.jpeg')}
            />
          </View> 

          <TouchableOpacity onPress={handleClick} style={styles.btnWrapper}>
            {!showOrder ? (
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
            <Text style={styles.sumTxt}>&#8377;{totalPrice.toFixed(2)}</Text>
          </TouchableOpacity>

          {showOrder ? ( 
            <View style={styles.summary}>
              <View style={styles.section}>
                {cart.map((cartItem, index) => (
                  <View style={styles.item} key={index}>
                    <View style={styles.absoluteCircle}>
                      <Text style={styles.t1}>{cartItem.qty}</Text>
                    </View>
                    <View style={styles.item1}>
                      <Image
                        style={styles.img}
                        source={{uri: cartItem.image}}
                      />
                      <Text style={styles.itemName}>
                        {cartItem.name}
                      </Text>
                    </View>
                    <View>
                        <Text style={styles.txtRight}>
                        &#8377;{cartItem.price}/kg
                        </Text>
                        <Text style={styles.itemPrice}>
                        &#8377;{cartItem.totalPrice}
                        </Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.section}>
                <View style={styles.infoInner}>
                  <Text style={styles.txtLeft}>Subtotal</Text>
                  <Text style={styles.txtRight}>&#8377;{totalPrice}</Text>
                </View>
                <View style={styles.infoInner}>
                  <Text style={styles.txtLeft}>Shipping</Text>
                  <Text style={styles.txtRight}>Free</Text>
                </View>
              </View>
              <View style={[styles.infoInner, {marginTop: 10}]}>
                <Text style={styles.txtLeft}>Total</Text>
                <Text
                  style={[styles.txtRight, {fontSize: 14, fontWeight: '700'}]}>
                  &#8377;{totalPrice}
                </Text>
              </View>
            </View>
          ) : null}

          {showInformation ? <Information user={route.params.user} cart={cart} /> : null}
          {showShipping ? <Shipping user={route.params.user} cart={cart} /> : null}
          {showPayment ? <Payment nav={navigation} user={route.params.user} /> : null}
        </ScrollView>
      </View>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#f1f1f1',
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
  itemPrice: {
    color: '#222',
    fontWeight: '700',
    fontSize: 12,
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
});
