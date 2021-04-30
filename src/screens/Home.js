import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import fetchProducts from '../redux/products/productActions';
import ItemsList from '../components/itemsList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const productsReducer = useSelector(state => state.products);
  const {error, loading, products} = productsReducer;

  const addToCartReducer = useSelector(state => state.addToCart)
  const {cart} = addToCartReducer;

  const handleAddToCart = () => {
    navigation.navigate('Cart');
  };

  // useEffect(async () => {
  //     const cartItems = await AsyncStorage.getItem("CartItem")
  //     if(cartItems){
  //       console.log("cart: ", cartItems)
  //       const cartItems1 = JSON.parse(cartItems)
  //       if(cart.length == 0 && cartItems1.length !== 0){
  //         dispatch({type: 'RESET_AND_ADD', payload: cartItems1})
  //       }
  //     }
  // }, [addToCartReducer]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])
  useEffect(async() => {
    const all = await AsyncStorage.getAllKeys()
    console.log("All: ", all)
  }, [])

  return (
    <View style={styles.container}>
      {loading ? (
          <ActivityIndicator size='large' color="#ff0000" />
      ) : error ? (<Text>{error}</Text>) : (
         <FlatList  
            data={products}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
                <ItemsList 
                    itemName={item.name}
                    price={item.price} 
                    photo={item.image}
                    buyLimit={item.orderLimit}
                    id={item._id}
                />
            )}
         />
      )}

      {cart.length ? (
          <TouchableOpacity
            onPress={handleAddToCart}
            style={styles.btn}>
            <Text style={[styles.txt, {color: '#fff'}]}>Buy now</Text>
          </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },
  btn: {
    backgroundColor: '#039646',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  txt: {
    fontWeight: '700',
  },
});
