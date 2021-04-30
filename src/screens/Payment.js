import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import RazorpayCheckout from 'react-native-razorpay';
import {TEST_KEY_ID, TEST_KEY_SECRET} from '../utils/razorpay'

const Payment = () => {
    const opentRazorPay = () => {
        const  options = {
            image: 'https://i.imgur.com/3g7nmJC.png',
            name: 'foo',
            description: 'Credits towards consultation',
            amount: '55000',
            currency: 'INR',
            key: TEST_KEY_ID,
            prefill: {
              email: 'wolverine.elham@gmail.com',
              contact: '91934624073',
              name: 'Razorpay Software'
            },
            theme: {color: '#039646'}
          }

          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
    }
    return (
        <View>
            <TouchableOpacity onPress={opentRazorPay}>
                <Text>Open</Text>

            </TouchableOpacity>
        </View>
    )
}

export default Payment
