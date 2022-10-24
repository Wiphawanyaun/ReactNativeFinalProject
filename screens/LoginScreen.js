import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,

} from "react-native";

import React, { useState } from "react";

const LoginScreen = ({navigation}) => {

  return (
    <SafeAreaView>
      <View style ={{flex:1}}>
      <Image
        style={styles.bgimage}
        source={require("../image_Video/loginimage.jpg")}
      
      />
        <Text style ={styles.headertext}>Welcome to</Text>
        <Text style ={styles.headertextname}>Be Pâtissier</Text>
        <TouchableOpacity
          onPress={ () => {navigation.navigate('Home')}}>
            
          <Text style ={styles.button_tohome}>Let's start</Text>
        </TouchableOpacity>
       
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button_tohome :{
    position :'absolute',
    top: 250,
    left: 20,
    fontSize :25,
    fontWeight :'bold',
    color :'#fff',
    backgroundColor: "rgba(2, 2, 2, 0.3)",
    padding:10,
    paddingHorizontal:15,
    borderRadius:25,
  },
  headertextname:{
    position :'absolute',
    top: 150,
    left: 20,
    fontSize :50,
    fontWeight :'bold',
    color :'#fff'
  },
  headertext:{
    position :'absolute',
    top: 50,
    left: 20,
    fontSize :60,
    fontWeight :'bold',
    color :'#fff',
    
  },

  bgimage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
