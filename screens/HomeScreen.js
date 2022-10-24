import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { SpeedDial } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

import cake from "../image_Video/cake_noaudio.mp4";

const HomeScreen = ({ navigation}) => {

  const [trend, setTrend] = useState([]);
  const [cataloge, setCatalog] = useState([]);

  const [fabopen, setFabOpen] = React.useState(false);

  const video = React.useRef(null);

  const [favoriteList, setFavoriteList] = useState([]);

  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      SetLoading(true);
      const res = await axios.get(
        "https://final-api.wiphawanpiapram.repl.co/products"
      );

      const restrend = await axios.get(
        "https://final-api.wiphawanpiapram.repl.co/trends"
      );

      setTrend(restrend.data);
      setCatalog(res.data);
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
        <Text>เกิดข้อผิดพลาด ไม่สามารถติดต่อกับเซิร์ฟเวอร์ได้</Text>
      </View>
    );
  }
  if (loading === true) {
    return (
      <View>
        <ActivityIndicator color="#eba2ad" size="large" />
      </View>
    );
  }

  const _onRefresh = () => {
    getData();
  };

  const onFavorite = (restaurant) => {
    setFavoriteList([...favoriteList, restaurant]);
  };
  const onRemoveFavorite = (restaurant) => {
    const filteredList = favoriteList.filter(
      (item) => item.id !== restaurant.id
    );
    setFavoriteList(filteredList);
  };

  const ifExists = (restaurant) => {
    if (favoriteList.filter((item) => item.id === restaurant.id).length > 0) {
      return true;
    }
    return false;
  };

  const Header = () => {
    return (
      <SafeAreaView>

          <Video
            ref={video}
            source={cake}
            resizeMode="cover"
            shouldPlay
            isLooping={true}
            style={styles.backgroundVideo}
            refreshing={loading}
            onRefresh={_onRefresh}
          />
       
        <Text style={styles.text_video_name}>Hi,My Dear</Text>
        <Text style={styles.text_video}>What do you want to make?</Text>

      </SafeAreaView>
    );
  };

  function Trend() {
    const _renderTrend = ({ item }) => {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.trend}
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
              style={styles.image_trend}
              // blurRadius={80}
            />

            <Text style={styles.name_type}>{item.type}</Text>
            <Text style ={styles.name_trend}>{item.name}</Text>
            <Text style ={styles.new}>new</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    };
    return (
      <View style={styles.container_trend}>
        <Text style={styles.trend_recipe}>Today Recipes</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={trend}
          keyExtractor={(item, index) => item.id}
          renderItem={_renderTrend}
          refreshing={loading}
          onRefresh={_onRefresh}
        />

      </View>
    );
  }


  function Listcataloges() {
    const _renderCataloge = ({ item }) => {
      return (
        <SafeAreaView style={styles.container_cataloge}>
          <TouchableOpacity
            style={styles.menu_list}
            onPress={() => {
              navigation.navigate("Recipe", {
                id: item.id,
              });
            }}
          >
            <Image
              resizeMode="cover"
              source={{ uri: item.image }}
              style={styles.image_list}
            />
            <Text style={styles.list_name_type}>{item.type}</Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() =>
                ifExists(item) ? onRemoveFavorite(item) : onFavorite(item)
              }
            >
              <MaterialIcons
                name={ifExists(item) ? "favorite" : "favorite-outline"}
                size={32}
                color={"red"}
              />
            </TouchableOpacity>
            <View style ={styles.con_list_detail}>
            <Text style={styles.text_list_name}>{item.name}</Text>
            </View>
           
          </TouchableOpacity>
        </SafeAreaView>
      );
    };
    return (
      <View >
         
        <FlatList
          data={cataloge}
          keyExtractor={(item, index) => item.id}
          ListHeaderComponent={Trend}
          renderItem={_renderCataloge}
          refreshing={loading}
          onRefresh={_onRefresh}
        />
      

      </View>
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
        buttonStyle={{ backgroundColor: "#bf2132" }}
      >
        <SpeedDial.Action
          icon={{ name: "favorite", color: "#fff" }}
          title="Favorite"
          onPress={() => {
            navigation.navigate("Favorite", {
              favoriteList,
            }),
              setFabOpen(!fabopen);
          }}
          buttonStyle={{ backgroundColor: "#bf2132" }}
        />

        <SpeedDial.Action
          icon={{ name: "search", color: "#fff" }}
          title="Search"
          onPress={() => {
            navigation.navigate("Search"), setFabOpen(!fabopen);
          }}
          buttonStyle={{ backgroundColor: "#bf2132" }}
        />
        <SpeedDial.Action
          icon={{ name: "login", color: "#fff" }}
          title="Logout"
          onPress={() => {
            navigation.navigate("Login"), setFabOpen(!fabopen);
          }}
          buttonStyle={{ backgroundColor: "#bf2132" }}
        />
      </SpeedDial>
    );
  }

  return (
    <SafeAreaView>
      {Header()}
      {Listcataloges()}
      {fab_g()}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  new:{ 
    position: "absolute",
    top: 10,
    left: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "red",
    borderRadius: 15,
    color: "#ffff",
  },

 

  text_video:{
    position: "absolute",
    backgroundColor: "rgba(2, 2, 2, 0.3)",
    top: 90,
    margin: 10,
    padding: 10,
    borderRadius: 25,
    color :'#ffff',
   fontSize:20,
   fontWeight:'bold'
  },

  text_video_name: {
    position: "absolute",
    backgroundColor: "rgba(2, 2, 2, 0.3)",
    top: 30,
    margin:10,
    padding: 10,
    borderRadius: 25,
    color :'#ffff',
    fontSize:25,
  },

  icon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  backgroundVideo: {
    position: "absolute",
    top: -60,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: 700,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(2, 2, 2, 0.7)",
  },
  container_cataloge: {
    flex: 1,
    backgroundColor: "#ebe6e7",
    marginTop: -30,
  },

  container_trend: {
    backgroundColor:  "#ebe6e7",
    marginTop: 400,
    borderRadius:30,
  },

  trend_recipe: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 20,
  },

  trend: {
    shadowColor: "#bbbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: 20,
    margin: 10,

    height: 350,
    width: 250,
  },

  image_trend: {
    width: 250,
    height: 300,
    borderRadius: 20,
  },
  list_name_type:{
    position: "absolute",
    top: 20,
    left: 25,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "rgba(2, 2, 2, 0.3)",
    borderRadius: 15,
    color: "#ffff",
  },

  name_type: {
    position: "absolute",
    top: 10,
    left: 65,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "rgba(2, 2, 2, 0.3)",
    borderRadius: 15,
    color: "#ffff",
  },

  name_trend:{
    position: "absolute",
    backgroundColor: "#bf2132",
   bottom:60,
    margin: 10,
    left:10,
    paddingVertical:0,
    paddingHorizontal:10,
    borderRadius: 15,
    color :'#ffff',
   fontSize:20,
   fontWeight:'bold'
  },
  image_list: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginRight:10,
  },

  menu_list: {
    backgroundColor: "#eba2ad",
    shadowColor: "#bbbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 40,
    padding: 10,
  },
  con_list_detail:{
    backgroundColor: "#ebe6e7",
    padding: 10,
    marginTop:10,
    marginBottom: 10,
    borderRadius: 20,
    alignItems:'center'
  },

  text_list_name: {
    fontSize: 25,
    fontWeight:'bold',
    color:"#8E1926",
  },

  text_list_detail: {
    fontSize: 18,
  },

});
