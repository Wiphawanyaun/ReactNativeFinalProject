import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const RecipeScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;

  const [recipe, setRecipe] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async (id) => {
    try {
      SetLoading(true);
      const res = await axios.get(
        "https://final-api.wiphawanpiapram.repl.co/recipe" + id
      );

      setRecipe(res.data);
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    getData(id);
  }, [id]);

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

  const _renderRecipe = ({ item }) => {
    return (
      <View style={styles.contain}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-2, 0, 2],
                  outputRange: [-0.5, 0, 1.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [2, 1, 1.0001],
                }),
              },
            ],
          }}
        >
          <Image
            resizeMode="cover"
            source={{ uri: item.image }}
            style={styles.image_list}
          />
          <View style={styles.bg_image}>
            <Text style={styles.text_in_image}>{item.name}</Text>
            <Text style={styles.text_in_detail}>{item.detail}</Text>
          </View>
        </Animated.View>
        <View style={styles.contain_text}>
         
          <Text style={styles.text_list}>Ingredients</Text>
          <Text style={styles.text_ingredient}>{item.ingredient}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.contain}>
      <Animated.FlatList
        data={recipe}
        keyExtractor={(item, index) => item.id}
        renderItem={_renderRecipe}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#765257",
  },

  contain_image: {
    position: "absolute",
    top: 100,
    left: 20,
    backgroundColor: "#ebe6e7",
    padding: 5,
    borderRadius: 10,
  },
  icon_image: {
    width: 45,
    height: 45,
  },

  contain_text: {
    backgroundColor: "#765257",
    borderRadius: 15,
  },
  bg_image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(2, 2, 2, 0.4)",
  },
  text_in_image: {
    position: "absolute",
    bottom: 150,
    color: "#ffff",
    padding: 10,
    fontSize:35,
    fontWeight:'bold'
  },
  text_in_detail: {
    position: "absolute",
    top:350,
    color: "#ffff",
    padding: 10,
    fontSize:15,

  },
  image_list: {
    width: "100%",
    height: 500,
    top: -0,
  },
  text_list: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "700",
    color: "#ffff",
    padding: 20,
  },

  text_ingredient: {
    marginLeft: 80,
    padding: 20,
    fontSize: 20,
    color: "#ffff",
    marginBottom: 10,
  },
});
