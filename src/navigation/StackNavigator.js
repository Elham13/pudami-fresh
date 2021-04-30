import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from '../screens/Home'
import Header from '../components/header';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import Payment from '../screens/Payment';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import ProfileSetting from '../screens/ProfileSetting';
import ChangePassword from '../screens/ChangePassword';

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
                name='Profile' 
                component={Profile}
                options={({navigation}) => ({
                    headerTitle: () => <Header nav={navigation} title="Profile" showNav={false} />,
                    headerStyle: {backgroundColor: '#039646'},
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <FontAwesome5 name="angle-left" size={20} style={styles.icon} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name='Settings' 
                component={Settings}
                options={({navigation}) => ({
                    headerTitle: () => <Header nav={navigation} title="Settings" showNav={false} />,
                    headerStyle: {backgroundColor: '#039646'},
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <FontAwesome5 name="angle-left" size={20} style={styles.icon} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name='ProfileSetting' 
                component={ProfileSetting}
                options={({navigation}) => ({
                    headerTitle: () => <Header nav={navigation} title="Profile Setting" showNav={false} />,
                    headerStyle: {backgroundColor: '#039646'},
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <FontAwesome5 name="angle-left" size={20} style={styles.icon} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name='ChangePassword' 
                component={ChangePassword}
                options={({navigation}) => ({
                    headerTitle: () => <Header nav={navigation} title="Change Password" showNav={false} />,
                    headerStyle: {backgroundColor: '#039646'},
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <FontAwesome5 name="angle-left" size={20} style={styles.icon} />
                        </TouchableOpacity>
                    ),
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
            <Stack.Screen 
                name='Payment' 
                component={Payment}
            />
            <Stack.Screen 
                name='Login' 
                component={Login}
                options={{headerShown:false}}
            />
            <Stack.Screen 
                name='Register' 
                component={Register}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}


const styles = StyleSheet.create({
    icon: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: '#f1f1f1',
    }
})


export {HomeStack};