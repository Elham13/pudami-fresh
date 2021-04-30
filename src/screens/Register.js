import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import registerUser from '../redux/users/registerActions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Register = ({navigation}) => {
  const dispatch = useDispatch(); 
  const reigserReducer = useSelector(state => state.register)
  const {loading, userData, userError} = reigserReducer

  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: '',
    password1: '',
    checkNameChange: false,
    checkEmailChange: false,
    secureTextEntry: true,
    isValidName: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidPassword1: true,
  });

  const nameChange = (val) => {
    if(val.trim().length >= 4){
        setData({
            ...data,
            fullName: val,
            isValidName: true,
            checkNameChange: true
        })
    }else{
        setData({
            ...data,
            fullName: val,
            isValidName: false,
            checkNameChange: false,
        })
    }
  }

  const handleValidName = (val) => {
    if(val.trim().length >= 4){
        setData({
            ...data,
            isValidName: true
        })
    }else{
        setData({
            ...data,
            isValidName: false
        })
    }
  }

  const emailChange = (val) => {
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(emailRegex.test(val)){
        setData({
            ...data,
            email: val,
            isValidEmail: true,
            checkEmailChange: true
        })
    }else{
        setData({
            ...data,
            email: val,
            isValidEmail: false,
            checkEmailChange: false,
        })
    }
  }

  const handleValidEmail = (val) => {
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(emailRegex.test(val)){
        setData({
            ...data,
            isValidEmail: true
        })
    }else{
        setData({
            ...data,
            isValidEmail: false
        })
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

  const handlePasswordChange1 = (val) => {
    if( val.trim() == data.password.trim() ) {
        setData({
            ...data,
            password1: val,
            isValidPassword1: true
        });
    } else {
        setData({
            ...data,
            password1: val,
            isValidPassword1: false
        });
    }
  }

  const registerHandler = (cred) => {
      if(cred.fullName.length == 0 || cred.email.length == 0 || cred.password.length == 0 || cred.password1.length == 0 ){
          Alert.alert("Wrong Input", "None of the inputs can be empty", [{text: "Okay"}])
          return
      }

      if(cred.isValidName && cred.isValidEmail && cred.isValidPassword && cred.isValidPassword1){
        //   Post to server
        const registerCred = {
          name: cred.fullName,
          email: cred.email,
          password: cred.password
        }

        dispatch(registerUser(registerCred));
      }else{
          Alert.alert("Invalid Input", "Please enter valid inputs", [{text: "Okay"}])
      }
  }

  const saveToAsyncStorage = async (obj) => {
    try {
      await AsyncStorage.setItem("User", JSON.stringify(obj))
      console.log("New user saved")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(userError.length > 0){
      Alert.alert('Something Wrong', userError, [{text: 'Okay'}])
    }
    if(Object.keys(userData).length > 0){
      saveToAsyncStorage(userData);
      navigation.navigate("Home");
    }
  }, [userData])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#039646" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer,{backgroundColor: '#f2f2f2'}]}>
            <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text_footer}>Full Name</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Your Full Name"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            value={data.fullName}
            onChangeText={(val) => nameChange(val)}
            onEndEditing={(e)=>handleValidName(e.nativeEvent.text)}
          />
          {data.checkNameChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        {data.isValidName ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Name must be at least 4 characters</Text>
          </Animatable.View>
        )}

        <Text style={[styles.text_footer, {marginTop: 25}]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            value={data.email}
            onChangeText={(val) => emailChange(val)}
            onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
          />
          {data.checkEmailChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        {data.isValidEmail ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Please enter a valid email</Text>
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
            value={data.password}
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


        <Text style={[styles.text_footer,{marginTop: 25}]}>Confirm Password</Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            value={data.password1}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange1(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword1 ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Passwords do not match
            </Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={() => registerHandler(data)}>
            <LinearGradient colors={['#039646', '#00cc00']} style={styles.signIn}>
              {loading ? <ActivityIndicator color="white" /> : <Text style={[styles.textSign,{color: '#fff'}]}>Register</Text>}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[styles.signIn,{
              borderColor: '#039646',
              borderWidth: 1,
              marginTop: 15,
            }]}>
            <Text style={[styles.textSign,{color: '#039646'}]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Register;

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
