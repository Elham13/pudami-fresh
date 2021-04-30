import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Avatar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(async () => {
    const userData = await AsyncStorage.getItem('User');
    if(userData !== null){
      setUser(JSON.parse(userData));
      console.log('Profile: ', user);
    }
  }, []);

  return (
    <View style={styles.container}>
      {Object.keys(user).length > 0 ? (
        <ScrollView>
        <View style={styles.topSection}>
          <LinearGradient
            colors={['#00dd00', '#002200']}
            style={styles.imageWrapper}>
            <View style={styles.imgContainer}>
              <Avatar.Image
                size={140}
                source={require('../assets/pudami-logo.jpeg')}
              />
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </LinearGradient>
        </View>

        {Object.keys(user).length > 0 && (
          <View style={styles.bottomeSection}>
              {user.profile.phone !== null && (
                <View style={styles.section}>
                  <FontAwesome
                    name="phone"
                    color="#039646"
                    size={26}
                    style={styles.icon}
                  />
                  <View style={styles.inner}>
                    <Text style={styles.txt1}>{user.profile.phone}</Text>
                    <Text style={styles.txt2}>Mobile</Text>
                  </View>
                </View>
              )}

              {user.profile.gender !== '' && (
                <View style={styles.section}>
                  <FontAwesome
                    name="male"
                    color="#039646"
                    size={26}
                    style={styles.icon}
                  />
                  <View style={styles.inner}>
                    <Text style={styles.txt1}>{user.profile.gender}</Text>
                    <Text style={styles.txt2}>Gender</Text>
                  </View>
                </View>
              )}

              {user.profile.busniusename !== '' && (
                <View style={styles.section}>
                  <FontAwesome
                    name="suitcase"
                    color="#039646"
                    size={20}
                    style={styles.icon}
                  />
                  <View style={styles.inner}>
                    <Text style={styles.txt1}>{user.profile.busniusename}</Text>
                    <Text style={styles.txt2}>Business Name</Text>
                  </View>
                </View>
              )}

              {user.profile.licencecode !== '' && (
                <View style={styles.section}>
                  <FontAwesome
                    name="drivers-license"
                    color="#039646"
                    size={20}
                    style={styles.icon}
                  />
                  <View style={styles.inner}>
                    <Text style={styles.txt1}>{user.profile.licencecode}</Text>
                    <Text style={styles.txt2}>License Code</Text>
                  </View>
                </View>
              )}
          </View>
        )}
      </ScrollView>
      ) : (<Text>You are not logged in</Text>)}
      
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
  imageWrapper: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  imgContainer: {
    backgroundColor: 'orange',
    padding: 4,
    borderRadius: 144 / 2,
  },
  img: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10,
  },
  email: {
    color: '#ccc',
  },
  bottomeSection: {},
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 0.9,
    borderColor: '#777',
    borderWidth: 0.5,
  },
  inner: {
    marginLeft: 10,
  },
  txt1: {
    fontSize: 16,
    fontWeight: '700',
  },
  txt2: {
    fontSize: 12,
    color: '#666',
  },
  icon: {
    width: 30,
  },
});
