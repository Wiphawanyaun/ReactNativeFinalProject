import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TextInput,
  Animated,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { SpeedDial } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import cake from "../image_Video/cake_noaudio.mp4";

const HomeScreen = ({ navigation }) => {
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
    console.log('bkbk',restaurant)
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

            <Text style={styles.name_trend}>{item.type}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    };
    return (
      <View style={styles.container_trend}>
        <Text style={styles.trend_recipe}>Trending Recipe</Text>
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
                name: item.name,
                image: item.image,
              });
            }}
          >
            <Image
              resizeMode="cover"
              source={{ uri: item.image }}
              style={styles.image_list}
            />
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
            <Text style={styles.text_list}>{item.name}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    };
    return (
      <SafeAreaView>
        <FlatList
          data={cataloge}
          keyExtractor={(item, index) => item.id}
          ListHeaderComponent={Trend}
          renderItem={_renderCataloge}
          refreshing={loading}
          onRefresh={_onRefresh}
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
        buttonStyle={{ backgroundColor: "#bf2132" }}
      >
        <SpeedDial.Action
          icon={{ name: "bookmark", color: "#fff" }}
          title="BookMark"
          onPress={() => {
            navigation.navigate("Bookmark", {
              favoriteList}),setFabOpen(!fabopen);
          }}
          buttonStyle={{ backgroundColor: "#bf2132" }}
        />

        <SpeedDial.Action
          icon={{ name: "search", color: "#fff" }}
          title="Search"
          onPress={() => {
            navigation.navigate("Search"),
            setFabOpen(!fabopen);
          }}
          buttonStyle={{ backgroundColor: "#bf2132" }}
        />
        <SpeedDial.Action
          icon={{ name: "login", color: "#fff" }}
          title="Logout"
          onPress={() => {
            navigation.navigate("Login"),setFabOpen(!fabopen);
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

  icon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  backgroundVideo: {
    position: "absolute",
    top: -3,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: 450,
  },
  container: {
    flex: 1,
    backgroundColor: "#ebe6e7",
  },
  container_cataloge: {
    flex: 1,
    backgroundColor: "#ebe6e7",
  },

  container_trend: {
    backgroundColor: "#ebe6e7",
    marginTop: 360,
    borderRadius:15,
  },

  trend_recipe: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
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
    height: 350,
    borderRadius: 20,
  },

  name_trend: {
    position: "absolute",
    top: 20,
    left: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#bf2132",
    borderRadius: 15,
    color: "#ffff",
  },

  blur_contain: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },

  blur_info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  blur_text: {
    width: "80%",
    color: "#ffff",
    fontSize: 18,
    fontWeight: "500",
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
    marginBottom: 20,
    marginTop: 40,
    paddingTop: 4,
  },

  text_list: {
    backgroundColor: "#ebe6e7",
    padding: 10,
    marginBottom: 10,
    fontSize: 30,
  },
});
