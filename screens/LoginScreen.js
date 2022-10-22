import { StyleSheet, Text, View, TextInput,Image,TouchableOpacity } from 'react-native'
import React,{useEffect, useState } from 'react'
import {useNavigation} from '@react-navigation/native'
import SignupScreen from './SignupScreen';

import { db } from '../firebase';

// import { firebaseApp } from '../firebase';

const LoginScreen = ({navigation}) => {
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');

  // const navigation = useNavigation()

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.replace("Home")
  //     }
  //   })

  //   return unsubscribe
  // }, [])

  const handleLogin=()=>{
    db
    .signInWithEmailAndPassword(email, pass)
     .then(userCredentials => {
      const user = userCredentials.user;
      console.log("Signed in in with",user.email);
    })
     .catch(error => alert(error.message))
  }

  
  return (
    <View style={styles.BG}>
      
        <View style={{flex:1,marginTop:20}}>
          <Text style={styles.TextTop}>Login</Text>
          <Image source={require('../assets/usericon.png')}
                  style={styles.imageStyle} />
          <Text style={styles.TextLogin}>Email</Text>
          
          <View style={styles.sectionStyle}>
            <Image source={require('../assets/email.png')}
                    style={styles.iconStyle} />
            <TextInput style={{flex:1,height:50}} 
              value={email}
              onChangeText = {text=>setEmail(text)}
              placeholder='Email'/>
          </View>

          <Text style={styles.TextLogin}>Password</Text>

          <View style={styles.sectionStyle}>
          <Image source={require('../assets/password.png')}
                    style={styles.iconStyle} />
          <TextInput secureTextEntry={true} style={{flex:1,height:50}}
            value={pass}
            onChangeText = {text=>setPass(text)}  
            placeholder='Password'/>
          </View>

        </View>
      <View  style={styles.Button}> 
        <TouchableOpacity
        onPress={handleLogin}>
          <Text style={{color:'white', fontSize:20}}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginOption}>
        <TouchableOpacity>
          <Image source={require('../assets/facebookicon.png')}
                style={styles.facebookStyle} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/google.png')}
                style={styles.googleStyle} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/twitter.png')}
                style={styles.twitterStyle} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={()=> navigation.navigate('Signup')}
        >
          <Text style={{marginLeft:135,
            marginBottom:30,
            fontSize:20,
            textDecorationLine:'underline',
            fontWeight:'bold',
            marginTop:50}}
            >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle : {
    padding: 10,
    margin: 5,
    marginLeft:105,
    marginBottom:20,
    height: 150,
    width: 150,
  },
  TextLogin : {
    marginLeft:50,
    fontWeight:'bold'
  },
  TextTop : {
    fontSize : 40,
    marginLeft : 125,
    fontWeight:'bold'
  },
  BG : {
    padding:20,
    backgroundColor:'#EAEAEA'
  },
  Button : {
    margin:40,
    marginLeft:90,
    width:170,
    height:60,
    fontSize:24,
    borderRadius:10,
    backgroundColor:'#bf2132',
    alignItems: 'center',
    padding: 15,
    fontWeight:200,
    
  },
  iconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'strecth',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 50,
    width : 250,
    borderRadius: 5,
    margin: 10,
    marginLeft : 50,
    
    },
    loginOption : {
      flexDirection: 'row',
      alignItems:'center',
      marginBottom:100
    },
    facebookStyle : {
      flexDirection: 'row',
      width:40,
      height:40,
      resizeMode: 'stretch',
      padding: 10,
      marginLeft:95,
      alignItems:'center'
    },
    googleStyle : {
      flexDirection: 'row',
      width:40,
      height:40,
      resizeMode: 'stretch',
      padding: 10,
      marginLeft:20,
      alignItems:'center'
    },
    twitterStyle : {
      flexDirection: 'row',
      width:40,
      height:40,
      resizeMode: 'stretch',
      padding: 10,
      marginLeft:20,
      alignItems:'center'
    },

});