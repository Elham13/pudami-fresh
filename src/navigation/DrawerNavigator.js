import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeStack} from '../navigation/StackNavigator';
import DrawerContent from '../components/drawerContent';

const Drawer = createDrawerNavigator(); 

const DrawerNavigator = () => { 
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent { ...props } />} initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeStack} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;