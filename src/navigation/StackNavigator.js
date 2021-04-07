import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from '../screens/Home'
import Header from '../components/header';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';

const Stack = createStackNavigator(); 

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
                name='Home' 
                component={Home}
                options={({navigation}) => ({
                    headerTitle: () => <Header nav={navigation} title="Home" showNav={true} />,
                    headerStyle: {backgroundColor: '#039646'}
                })}
            />
            <Stack.Screen 
                name='Cart' 
                component={Cart}
            />
            <Stack.Screen 
                name='Checkout' 
                component={Checkout}
            />
        </Stack.Navigator>
    )
}


const styles = StyleSheet.create({
    icon: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#f1f1f1'
    }
})


export {HomeStack};