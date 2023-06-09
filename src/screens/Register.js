import { StyleSheet, Text, View, Image, Button, Pressable, Alert, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

// Images
import background from '../../assets/background.jpg';
import logo from '../../assets/logo.png';

// Common
import {submit} from '../common/button';
import {input} from '../common/input';

// Navigation
import Login from './Login';
import Landing from './Landing';
import Welcome from './Welcome';

const Register = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    firstName: '',
    lastName: '',
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
    mobileNumber: '',
    email: '',
    password: ''
  });

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    if (fdata.firstName == '' ||
        fdata.lastName == '' ||
        fdata.dayOfBirth == '' ||
        fdata.monthOfBirth == '' ||
        fdata.yearOfBirth == '' ||
        fdata.mobileNumber == '' ||
        fdata.email == '' ||
        fdata.password == '') {
        setErrormsg('All fields are required');
        return;
    }
    else {
        // if (fdata.password != fdata.cpassword) {
        //     setErrormsg('Password and Confirm Password must be same');
        //     return;
        // }
        // else {

            fetch('http://10.8.13.159:'+process.env.PORT+'/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
                .then(res => res.json()).then(
                    data => {
                        // console.log(data);
                        if (data.error === 'Invalid Credentials') {
                            // alert('Invalid Credentials')
                            setErrormsg('Invalid Credentials')
                        }
                        else if (data.message === "Verification Code Sent to your Email") {
                            // console.log(data.udata);
                            alert(data.message);
                            navigation.navigate('verification', { userdata: data.udata })
                        }
                    }
                ).catch((error) => {
                  // Handle any errors that occur
                  console.error(error);
              });
              // }
    }
  }

  return (
    <View style = {styles.container}>
      <Image style={styles.bg} source={background}></Image>
      <ScrollView contentContainerStyle = {styles.textContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Image style={styles.logo} source={logo} />
        </TouchableOpacity>
        <Text style = {[styles.text, {marginBottom: 35}]}>Register your Account</Text>
        {
          errormsg ? <Text style={[styles.text, {color: 'red'}]}>{errormsg}</Text> : null
        }
        <Text style = {[styles.text, {fontSize: 15, marginBottom: -5}]}>Name</Text>
        <View style = {styles.innerContainer}>
          <TextInput style = {[input, {flex: 1, minWidth: 100}]} placeholder="First Name" onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, firstName: text })}/>
          <TextInput style = {[input, {flex: 1, minWidth: 100}]} placeholder="Last Name" onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, lastName: text })}/>
        </View>
        <Text style = {[styles.text, {fontSize: 15, marginBottom: -5}]}>Date of Birth</Text>
        <View style = {styles.innerContainer}>
          <TextInput style = {[input, {flex: 2, minWidth: 50}]} placeholder="Month" keyboardType='number-pad' onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, monthOfBirth: text })}/>
          <TextInput style = {[input, {flex: 2, minWidth: 50}]} placeholder="Day" keyboardType='number-pad' onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, dayOfBirth: text })}/>
          <TextInput style = {[input, {flex: 3, minWidth: 100}]} placeholder="Year" keyboardType='number-pad' onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, yearOfBirth: text })}/>
        </View>
        <TextInput style = {input} placeholder="Mobile Number" keyboardType='number-pad' onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, mobileNumber: text })}/>
        <TextInput style = {[input, {textTransform: 'lowercase'}]} placeholder="Email Address" keyboardType='email-address' onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, email: text })}/>
        <TextInput style = {input} placeholder="Password" secureTextEntry={true} onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, password: text })}/>
        <Text style={{fontSize: 15, color: '#000', marginTop: 10, marginBottom: 20}}>Already have an account?&nbsp;
          <Text style={{color: '#004aad'}} onPress={() => navigation.navigate('Login')}>Login instead!</Text>
        </Text>
        <Pressable style={submit} onPress={() => Sendtobackend()}>
          <Text style={styles.text}>Register</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
      width: '100%',
      height: '100%'
  },
  textContainer: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      height: '100%'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  bg: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: -1
  },
  text: {
      fontSize: 25,
      color: '#000'
  },
  logo: {
      width: '20%',
      height: undefined,
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: '#ffde59',
      borderRadius: 5,
      marginBottom: 20
  }
});