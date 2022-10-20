import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";


const RecipeScreen = ({ navigation, route }) => {
  const { id, name } = route.params;


  const [recipe, setRecipe] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions(
      {
        name: name,
      },
      [navigation, name]
    );
  });
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
    getData(id);
  };

  const _renderRecipe = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
          <View>
            <View>
              <Text>{item.name}</Text>
              <Text>{item.ingredient}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={recipe}
        keyExtractor={(item, index) => item.id}
        renderItem={_renderRecipe}
        refreshing={loading}
        onRefresh={_onRefresh}
      />
    </View>
  );
};

export default RecipeScreen;
