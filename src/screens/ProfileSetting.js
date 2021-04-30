import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import editProfile from '../redux/users/editProfileAction';

const ProfileSetting = () => {
  const dispatch = useDispatch();
  const editProfileReducer = useSelector(state => state.editProfile);
  const {loading, editedData, editedError} = editProfileReducer;

  const [loggedin, setLoggedIn] = useState(false)
  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: 'Female',
    phone: 0,
    busniusename: '',
    licencecode: '',
    token: '',
  });

  const handleName = val => {
    setUser({
      ...user,
      name: val,
    });
  };
  const handleEmail = val => {
    setUser({
      ...user,
      email: val,
    });
  };
  const handleGender = val => {
    setUser({
      ...user,
      gender: val,
    });
  };
  const handlePhone = val => {
    setUser({
      ...user,
      phone: val,
    });
  };
  const handleBusines = val => {
    setUser({
      ...user,
      busniusename: val,
    });
  };
  const handleLicense = val => {
    setUser({
      ...user,
      licencecode: val,
    });
  };
  const handleImage = () => {};

  const handleSubmit = obj => {
    dispatch(editProfile(obj));
  };

  useEffect(async () => {
    const item = await AsyncStorage.getItem('User');
    if (item) {
      setLoggedIn(true)
      const item1 = JSON.parse(item);
      const {name, email, token} = item1;
      const {gender, phone, busniusename, licencecode} = item1.profile;
      setUser({
        name,
        email,
        gender: gender ? gender : 'Male',
        phone: phone,
        busniusename, 
        licencecode,
        token,
      });
      // console.log("User: ", item1)
    }
  }, []);

  useEffect(async () => {
    // console.log("Loading: ", loading)
    // console.log("Data: ", editedData)
    // console.log("Error: ", editedError)
    if (Object.keys(editedData).length) {
      await AsyncStorage.setItem('User', JSON.stringify(editedData));
    }
    const item = await AsyncStorage.getItem('User');
    if (item) {
      const item1 = JSON.parse(item);
      const {name, email, token} = item1;
      const {gender, phone, busniusename, licencecode} = item1.profile;
      setUser({
        name,
        email,
        gender: gender ? gender : 'Male',
        phone: phone,
        busniusename,
        licencecode,
        token,
      });
    }
  }, [editProfileReducer]);

  return (
    <View style={styles.contanier}>
      {loggedin ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.top}>
            <View style={styles.imgWrapper}>
              <Image
                source={require('../assets/pudami-logo.jpeg')}
                style={styles.img}
              />
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleImage}>
              <Text style={styles.btnTxt}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottom}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Name</Text>
              <TextInput
                style={styles.input}
                value={user.name}
                onChangeText={value => handleName(value)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Email</Text>
              <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={value => handleEmail(value)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Phone number</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                value={`${user.phone}`}
                onChangeText={value => handlePhone(value)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Busines name</Text>
              <TextInput
                style={styles.input}
                value={user.busniusename}
                onChangeText={value => handleBusines(value)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>License code</Text>
              <TextInput
                style={styles.input}
                value={user.licencecode}
                onChangeText={value => handleLicense(value)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputTxt}>Gender</Text>
              <RNPickerSelect
                onValueChange={value => handleGender(value)}
                style={styles.input}
                placeholder={{}}
                value={user.gender}
                items={[
                  {label: 'Male', value: 'Male'},
                  {label: 'Female', value: 'Female'},
                  {label: 'Transgender', value: 'Transgender'},
                ]}
              />
            </View>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => handleSubmit(user)}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveTxt}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.onlyTxt}>You are not logged in!</Text>
      )}
    </View>
  );
};

export default ProfileSetting;

const styles = StyleSheet.create({
  onlyTxt: {
    alignSelf: 'center',
    marginTop: '50%',
    fontSize: 20,
    fontWeight: '700',
  },
  contanier: {
    flex: 1,
  },
  top: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  imgWrapper: {
    backgroundColor: '#039646',
    padding: 3,
    borderRadius: 153 / 2,
  },
  btn: {
    backgroundColor: '#039646',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginTop: 5,
  },
  btnTxt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  bottom: {
    paddingHorizontal: 20,
    paddingBottom: 50,
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
  inputWrapper: {
    marginTop: 20,
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
});
