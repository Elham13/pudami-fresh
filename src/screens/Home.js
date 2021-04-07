import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { data } from '../utils/dumyData';
import ItemsList from '../components/itemsList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Home = ({navigation}) => {
    const [changed, setChanged] = useState(false);
    const [addToCart, setAddToCart] = useState([]);

    const handleChange = () => {
        setChanged(true);
    };

    const handleInput = (data) => {
        setAddToCart(prevState => [...prevState,  data]);
    }

    const handleAddToCart = () => {
        navigation.navigate("Cart");
    }

    // useEffect(() => {
    // }, [addToCart]);

    return (
        <View style={styles.container}>
            <ItemsList addToCart={handleChange} getData={handleInput} itemName="Onion" price={120} buyLimit={50} id={1} />
            <ItemsList addToCart={handleChange} getData={handleInput} itemName="Garlic" price={200} buyLimit={10} id={2} />
            <ItemsList addToCart={handleChange} getData={handleInput} itemName="Ginger" price={250} buyLimit={10} id={3} />
            <ItemsList addToCart={handleChange} getData={handleInput} itemName="Potato" price={130} buyLimit={10} id={4} />

            {changed ? (
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: '#fff'}]}>
                        <Text style={styles.txt}>Buy Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAddToCart} style={[styles.btn, {width: 236}]}>
                        <Text style={[styles.txt, {color: '#fff'}]}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            ): null}

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
    },
    btnWrapper: {
        paddingVertical: 5,
        position: 'absolute',
        width: windowWidth,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    btn: {
        backgroundColor: '#039646',
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'center',
    },
    txt: {
        fontWeight: '700',
    }
})