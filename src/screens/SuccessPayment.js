import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SuccessPayment = ({route}) => {

    useEffect(() => {
        console.log(route.params)
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.infoWrapper}>

            </View>
        </View>
    )
}

export default SuccessPayment

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoWrapper: {

    }
})
