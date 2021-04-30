import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reqVerifyPass from '../redux/users/verifyPasswordAction';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const verifyPasswordReducer = useSelector(state => state.verifyPassword);
  const {verifyLoading, verifyData, verifyError} = verifyPasswordReducer;

  const [canChange, setCanChange] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [user, setUser] = useState({});

  const handleVerify = pass => {
    if (pass.length) {
      const oldPass = {
        validUser: false,
        oldPassword: pass,
        token: user.token,
      };
      dispatch(reqVerifyPass(oldPass));
    } else {
      Alert.alert(
        'Denied',
        'Please enter your old password to varify that you are the actual owner',
        [{text: 'Okay'}],
      );
    }
  };

  const handleSubmit = pass => {
    if(pass.trim().length < 6){
        Alert.alert("Invalid input", "Password cannot be less than 6 character long", [{text: "Okay"}])
    }else{
        if(pass.trim() === confirmPass.trim()){
            const reqObj = {
                oldPassword: oldPass.trim(),
                newPassword: pass.trim(),
                token: user.token,
                validUser: true
            }
            dispatch(reqVerifyPass(reqObj))
        }else{
            Alert.alert("Invalid input", "Passwords don't match", [{text: "Okay"}])
        }
    }
  };

  useEffect(async () => {
    console.log('Loading: ', verifyLoading);
    console.log('Data: ', verifyData);
    console.log('Error: ', verifyError);
    if (Object.keys(verifyData).length) {
        
      if (verifyData.validUser) {
        setCanChange(true);
        const updatedUser = {
          ...user,
          token: verifyData.token,
        };
        await AsyncStorage.setItem('User', JSON.stringify(updatedUser));
      } else {
        setCanChange(false);
        Alert.alert(
          'Invalid password',
          verifyData.message,
          [{text: 'Okay'}],
        );
      }

      if(verifyData.message == "Password changed successfully"){
        setCanChange(false)
        Alert.alert("Success", "Password changed successfully", [{text: "Okay"}])
        setOldPass('')
        setNewPass('')
        setConfirmPass('')
        const updatedUser = {
            ...user,
            token: verifyData.token,
          };
        await AsyncStorage.setItem('User', JSON.stringify(updatedUser));    
    }
    }
  }, [verifyPasswordReducer]);

  useEffect(async () => {
    const item = await AsyncStorage.getItem('User');
    if (item) {
      setUser(JSON.parse(item));
      console.log("User: ", item);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require('../assets/pudami-logo.jpeg')}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.keys(user).length ? (
          <View style={styles.bottom}>
            <Text style={styles.title}>Change Password</Text>

            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputTxt}>Old password</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={value => setOldPass(value)}
                  value={oldPass}
                />
              </View>

              {canChange == true ? (
                <>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputTxt}>New password</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={txt => setNewPass(txt)}
                      value={newPass}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputTxt}>Confirm password</Text>
                    <TextInput
                      onChangeText={txt => setConfirmPass(txt)}
                      style={styles.input}
                      value={confirmPass}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => handleSubmit(newPass)}>
                    {verifyLoading ?
                      <ActivityIndicator color="#fff" />
                     : 
                      <Text style={styles.saveTxt}>Change</Text>
                    }
                  </TouchableOpacity>
                </>
              ) : (
                <View>
                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => handleVerify(oldPass)}>
                    {verifyLoading ?
                      <ActivityIndicator color="#fff" />
                     : 
                      <Text style={styles.saveTxt}>Verify</Text>
                    }
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ) : (
          <Text style={styles.onlyTxt}>You are not logged in!</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  title: {
    paddingTop: 20,
    fontSize: 18,
    fontWeight: '700',
    borderBottomColor: 'orange',
    color: '#039646',
    borderBottomWidth: 3,
    width: 200,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: '#039646',
  },
  inputTxt: {
    position: 'absolute',
    backgroundColor: '#eee',
    top: -12,
    left: 17,
    zIndex: 1,
    paddingHorizontal: 5,
    fontWeight: '700',
    fontSize: 12,
  },
  form: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  inputWrapper: {
    marginVertical: 15,
  },
  saveBtn: {
    backgroundColor: '#039646',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 5,
  },
  saveTxt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  bottom: {
    paddingBottom: 30,
  },
  onlyTxt: {
    alignSelf: 'center',
    marginTop: '50%',
    fontSize: 20,
    fontWeight: '700',
  },
});
