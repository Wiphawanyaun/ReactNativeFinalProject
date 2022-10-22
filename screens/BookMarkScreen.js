import { StyleSheet, Text, View, FlatList, Image,SafeAreaView, } from "react-native";
import React from "react";
import { SpeedDial } from "@rneui/themed";

const BookMarkScreen = ({ navigation,route }) => {
    const { favoriteList } = route.params;
    const [fabopen, setFabOpen] = React.useState(false);
    const bookmark = ({item}) =>{
        return (
            <SafeAreaView>
            <View style={styles.contain}>
              <View style={styles.contain_list}>
                <View style={styles.row}>
                  <Text>{item.name}</Text>
                  <Text>{item.detail}</Text>
                  <View>
                    <Image
                      source={{ uri: item.image }}
                      resizeMode="cover"
                      style={styles.image_list}
                    />
                  </View>
                </View>
              </View>
            </View>
            </SafeAreaView>
          );
    }

    const listbookmark = () =>{
        return (
            <SafeAreaView>
            <FlatList
              data={favoriteList}
              renderItem={(bookmark) }
            />
            </SafeAreaView>
          );
    }


    function fab_g() {
        return (
          <SpeedDial
            isOpen={fabopen}
            icon={{ name: "icecream", color: "#fff" }}
            openIcon={{ name: "icecream", color: "#fff" }}
            onOpen={() => setFabOpen(!fabopen)}
            onClose={() => setFabOpen(!fabopen)}
            buttonStyle={{ backgroundColor: "#bf2132"}}
          >
            <SpeedDial.Action
              icon={{ name: "home", color: "#fff" }}
              title="Home"
              onPress={() => {
                navigation.dispatch()
              }}
              buttonStyle={{ backgroundColor: "#bf2132"}}
            />
             <SpeedDial.Action
              icon={{ name: "login", color: "#fff" }}
              title="Login"
              onPress={() => {
                navigation.navigate("Login")
              }}
              buttonStyle={{ backgroundColor: "#bf2132"}}
            />
          </SpeedDial>
        );
      }
 
  return (
    <SafeAreaView>
 
    {listbookmark()}
    </SafeAreaView>
  );

 
};

export default BookMarkScreen;

const styles = StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:"#ebe6e7",
       
    },

  image_list: {
    width: "100%",
    height: 250,
    marginBottom: 10,
    borderRadius: 15,
  },
});
