import { View, Text, Image } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import RecipeScreen from "./screens/RecipeScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import FavoriteScreen from "./screens/FavoriteScreen";



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer
    >
      <Stack.Navigator >
      
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
         
        />
        <Stack.Screen
          name="Recipe"
          component={RecipeScreen}
          options={{ headerTransparent: true}}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen}  />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
