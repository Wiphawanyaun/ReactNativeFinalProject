import { StyleSheet, Text, View, FlatList, Image,SafeAreaView,TouchableOpacity } from "react-native";
import React from "react";

const FavoriteScreen = ({ navigation,route }) => {
    const { favoriteList, } = route.params;

    const favorite = ({item}) =>{
      return (
        <SafeAreaView style={styles.container_cataloge}>
          <TouchableOpacity
            style={styles.menu_list}
            onPress={() => {
              navigation.navigate("Recipe", {
                id: item.id,
                name: item.name,
              });
            }}
          >
            <Image
              resizeMode="cover"
              source={{ uri: item.image }}
              style={styles.image_list}
            />
            <View style={styles.con_list_detail}>
              <Text style={styles.text_list_name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }

    const listFavorite = () =>{
        return (
            <SafeAreaView>
            <FlatList
              data={favoriteList}
              renderItem={(favorite) }
            />
            </SafeAreaView>
          );
    }

 
  return (
    <SafeAreaView>
 
    {listFavorite()}
    </SafeAreaView>
  );

 
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:"#ebe6e7",
       
    },
    container_cataloge: {
      flex: 1,
      backgroundColor: "#ebe6e7",
    },

    image_list: {
      width: "100%",
      height: 250,
      marginBottom: 10,
      borderRadius: 15,
    },
  
    menu_list: {
      backgroundColor: "#eba2ad",
      shadowColor: "#bbbb",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      borderRadius: 10,
      marginBottom: 10,
      marginTop: 20,
      padding: 10,
    },
    con_list_detail: {
      backgroundColor: "#ebe6e7",
      padding: 10,
  
      marginBottom: 10,
      borderRadius: 20,
    },
  
    text_list_name: {
      fontSize: 25,
      fontWeight: "bold",
    },
});
