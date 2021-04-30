import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';

const DrawerContent = ({ navigation }) => {
    const dispatch = useDispatch();
    const registerReducer = useSelector(state => state.register)
    const {loading, userData, userError} = registerReducer

    const [userState, setUserState] = useState({});
    
    const getUser = () => {
        AsyncStorage.getItem("User").then(user => {
            if(user !== null) setUserState(JSON.parse(user))
        })
    }

    const loginHandler = async () => {
        if(Object.keys(userState).length > 0){
            await AsyncStorage.removeItem("User");
            dispatch({type: 'LOGOUT'});
        }
        navigation.navigate('Login')
    }
    useEffect(() => {
        // console.log("User: ", getUser())
        getUser();
    }, [registerReducer])    
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image style={styles.img} source={require('../assets/pudami-logo.jpeg')} />
            </View>
            <View style={styles.btnWrapper}>
                <View style={styles.drawerSection}>
                    <TouchableOpacity style={styles.drawerNav} onPress={() => navigation.navigate("Profile")}>
                        <View style={styles.navTxtWrapper}>
                            <MaterialIcons name="circle" size={10} color="#333" />
                            <Text style={styles.navTxt}>Profile</Text>
                        </View>
                        <MaterialIcons name="double-arrow" size={10} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerNav} >
                        <View style={styles.navTxtWrapper}>
                            <MaterialIcons name="circle" size={10} color="#333" />
                            <Text style={styles.navTxt}>You Orders</Text>
                        </View>
                        <MaterialIcons name="double-arrow" size={10} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerNav} onPress={() => navigation.navigate("Settings")}>
                        <View style={styles.navTxtWrapper}>
                            <MaterialIcons name="circle" size={10} color="#333" />
                            <Text style={styles.navTxt}>Settings</Text>
                        </View>
                        <MaterialIcons name="double-arrow" size={10} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerNav} onPress={loginHandler} >
                        <View style={styles.navTxtWrapper}>
                            <MaterialIcons name="circle" size={10} color="#333" />
                            {Object.keys(userState).length > 0 ? 
                                <Text style={styles.navTxt}>Logout</Text>
                                :<Text style={styles.navTxt}>Login</Text>
                            }
                        </View>
                        <MaterialIcons name="double-arrow" size={10} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc'
    },
    top: {
        backgroundColor: '#fff'
    },
    img: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
    },
    drawerSection: {
        marginTop: 5,
        backgroundColor: '#fff'
    },
    drawerNav: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    navTxtWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    navTxt: {
        fontSize: 11,
        marginLeft: 5,
    },
    btnWrapper: {
        borderTopWidth: 0.5,
        borderTopColor: '#999'
    }
})
