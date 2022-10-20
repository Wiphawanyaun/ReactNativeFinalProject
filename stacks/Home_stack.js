import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import RecipeScreen from '../screens/RecipeScreen';

const screen = {
    Home :{
        screen: HomeScreen
    },

    Search :{
        screen: SearchScreen
    },
    Recipe :{
        screen:RecipeScreen
    }

}

const Home_Stack = createStackNavigator(screen);

export default createAppContainer(Home_Stack);