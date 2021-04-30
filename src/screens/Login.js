import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import loginUser from '../redux/users/loginAction'

const Login = ({navigation}) => {
  const dispatch = useDispatch()
  const loginReducer = useSelector(state => state.login);
  const {loginLoading, loginData, loginError} = loginReducer

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = (val) => {
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(emailRegex.test(val.trim()) ) {
        setData({
            ...data,
            email: val,
            check_textInputChange: true,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            email: val,
            check_textInputChange: false,
            isValidUser: false
        });
    }
  }

  const handlePasswordChange = (val) => {
    if( val.trim().length >= 6 ) {
        setData({
            ...data,
            password: val,
            isValidPassword: true
        });
    } else {
        setData({
            ...data,
            password: val,
            isValidPassword: false
        });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidUser = (val) => {
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if( emailRegex.test(val) ) {
        setData({
            ...data,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            isValidUser: false
        });
    }
  }

  const loginHandle = async (email, password) => {

    if ( email.length == 0 || password.length == 0 ) {
        Alert.alert('Wrong Input!', 'Email or password fields cannot be empty.', [
            {text: 'Okay'}
        ]);
        return;
    }

    if(data.isValidUser && data.isValidPassword){
      const credObj = {
        email: email,
        password: password
      }
      dispatch(loginUser(credObj));
    }else{
      Alert.alert("Invalid Input!", "Please enter a valid email and password", [{text: 'Okay'}])
    }
  }

  const saveToAsyncStorage = async (obj) => {
    try {
      await AsyncStorage.removeItem("User")
      await AsyncStorage.setItem("User", JSON.stringify(obj))
      console.log("New user saved")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("Loading: ", loginLoading)
    console.log("Data: ", loginData)
    console.log("Error: ", loginError)
    if(loginError.length > 0){
      Alert.alert("Login fail!", "Email or password is incorrect", [{text: "Okay"}])
    }
    if(Object.keys(loginData).length > 0){
      saveToAsyncStorage(loginData);
      navigation.navigate("Home");
    }
  }, [loginReducer])


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#039646" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer,{backgroundColor: '#f2f2f2'}]}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Please enter a valid email.</Text>
          </Animatable.View>
        )}

        <Text style={[styles.text_footer,{marginTop: 25}]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 6 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{color: '#039646', marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={() => {loginHandle(data.email, data.password);}}>
            <LinearGradient colors={['#039646', '#00cc00']} style={styles.signIn}>
              {loginLoading ? <ActivityIndicator color='white' /> : <Text style={[styles.textSign,{color: '#fff'}]}>Login</Text>}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={[styles.signIn,{
              borderColor: '#039646',
              borderWidth: 1,
              marginTop: 15,
            }]}>
            <Text style={[styles.textSign,{color: '#039646'}]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#039646',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 14,
  },
  action: {
    flexDirection: 'row',
    marginTop: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
