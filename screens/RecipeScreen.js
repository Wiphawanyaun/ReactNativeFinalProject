import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Linking,
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
            <ItemSeparatorView />
            <Text style={styles.text_in_detail}>{item.detail}</Text>
            <Text style={styles.text_in_time}>{item.time}</Text>
          </View>
        </Animated.View>
        <View style={styles.contain_text}>
          <Text style={styles.text_list}>Ingredients</Text>
          <Text style={styles.text_ingredient}>{item.ingredient}</Text>
          <Text style={styles.text_list}>Tutorial</Text>
          <Text style={styles.text_tutorial}>{item.tutorial}</Text>
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

const ItemSeparatorView = () => {
  return (
    <View
      style={{
        height: 2,
        width: 340,
        backgroundColor: "#ebe6e7",
        position: "absolute",
        bottom: 150,
        left: 10,
      }}
    />
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "rgba(2, 2, 2, 0.6)",
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
    backgroundColor: "rgba(2, 2, 2, 0.9)",
    borderRadius: 25,
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
    fontSize: 35,
    fontWeight: "bold",
  },
  text_in_detail: {
    position: "absolute",
    top: 400,
    color: "#ffff",
    padding: 10,
    fontSize: 15,
  },

  text_in_time: {
    position: "absolute",
    top: 360,
    color: "#ffff",
    left: 5,
    padding: 10,
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 25,
    backgroundColor: "rgba(2, 2, 2, 0.2)",
  },
  image_list: {
    width: "100%",
    height: 500,
    top: -0,
  },
  text_list: {
    fontSize: 30,
    fontWeight: "700",
    padding: 20,
    paddingBottom: 0,
    color: "#ffff",
  },
  text_tutorial: {
    marginLeft: 20,
    padding: 20,
    fontSize: 20,
    marginBottom: 10,
    color: "#ffff",
  },

  text_ingredient: {
    marginLeft: 20,
    padding: 20,
    fontSize: 20,
    marginBottom: 10,
    color: "#ffff",
  },
});
