import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Settings = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("ProfileSetting")}>
                <View style={styles.btnInner}>
                <FontAwesome name="user" size={20} color='#039646' />
                <Text style={styles.txt}>My Profile</Text>
                </View>
                <FontAwesome name="angle-double-right" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("ChangePassword")}>
                <View style={styles.btnInner}>
                <FontAwesome name="unlock-alt" size={20} color='#039646' />
                <Text style={styles.txt}>Change Password</Text>
                </View>
                <FontAwesome name="angle-double-right" size={20} />
            </TouchableOpacity>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#ddd',
        paddingVertical: 10,
    },
    btn: {
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    btnInner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt: {
        fontWeight: '700',
        marginLeft: 10,
        color: '#333'
    },
})
