import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';

const itemsList = ({addToCart, itemName, price, buyLimit, id}) => {
  const [added, setAdded] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(buyLimit);

  const dispatch = useDispatch();

  useEffect(() => {
  }, [added])

  const handleAddtoCart = () => {
    setTotal(price * limit)
    setAdded(true);
    addToCart();
  };

  const increase = () => {
    setLimit(limit + buyLimit);
    setTotal((limit + buyLimit) * price )
  }

  const decrease = () => {
    if(limit == 0){
        setTotal(0);
        setLimit(0);
        setAdded(false)
    }else{
        setLimit(limit - buyLimit);
        setTotal((limit - buyLimit) * price);
    }
  }
  
  useEffect(() => {
    if(limit == 0){
        setTotal(0);
        setLimit(0);
        setAdded(false)
    }
  }, [limit]);

  return (
    <View style={styles.section}>
      <View style={styles.grid}>
        <View style={styles.left}>
          <TouchableOpacity>
            <Image style={styles.img} source={require('../assets/pudami-logo.jpeg')} />
          </TouchableOpacity>
          <View style={styles.txtWrapper}>
            <Text style={styles.name}>{itemName}</Text>
            <Text style={styles.price}>&#8377;{price}/kg</Text>
            <Text style={styles.total}>&#8377;{total}</Text>
          </View>
        </View>
        <View style={styles.right}>
          {added ? (
            <View style={styles.btnWrapper}>
              <TouchableOpacity onPress={decrease} style={[ styles.btn, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}, ]}>
                <Text style={styles.btnTxt}>&ndash;</Text>
              </TouchableOpacity>
              <Text style={styles.txtMiddle}>{limit}</Text>
              <TouchableOpacity onPress={increase} style={[styles.btn, {borderTopRightRadius: 10, borderBottomRightRadius: 10},]}>
                <Text style={styles.btnTxt}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.btnWrapper} onPress={handleAddtoCart}>
                  <View style={styles.inner}>
                    <Text style={styles.innerTxt}>Add</Text>
                  </View>
            </TouchableOpacity>
          )}
        </View> 
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
    count: state.count
})
export default connect(mapStateToProps)(itemsList);

const styles = StyleSheet.create({
  section: {
    // backgroundColor: '#187CB8',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 4,
    padding: 1,
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
  },
  right: {},
  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  txtWrapper: {
    marginLeft: 5,
  },
  name: {
    color: '#333',
    fontWeight: 'bold',
  },
  price: {
    color: '#777',
    fontSize: 11,
  },
  total: {
    color: '#777',
    fontSize: 11,
  },
  btnWrapper: {
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  btn: {
    borderWidth: 0.5,
    borderColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  btnTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  txtMiddle: {
    width: 40,
    textAlign: 'center',
    color: '#333',
    fontSize: 12,
  },
  inner: {
      paddingVertical: 7,
      paddingHorizontal: 45,
  },
  innerTxt: {
      color: '#333',
      fontSize: 12,
  }
});
