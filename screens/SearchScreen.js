import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SpeedDial } from "@rneui/themed";
import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchScreen = ({ navigation }) => {
  
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [fabopen, setFabOpen] = React.useState(false);

  const [cataloge, setCatalog] = useState([]);
  const [callcataloge, setCallCatalog] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [resetSearch, setResetSearch] = useState([]);

  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      SetLoading(true);
      const res = await axios.get(
        "https://final-api.wiphawanpiapram.repl.co/products"
      );

      setCatalog(res.data);
      setCallCatalog(res.data);
      setResetSearch(res.data);
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

  function Header() {
    return (
      <SafeAreaView style ={{marginTop:50}}>
        <SearchBar
          value={searchData}
          placeholder="Search Here"
          onChangeText={(text) => serchFilter(text)}
          inputContainerStyle ={{borderRadius:50}}
          
        />
      </SafeAreaView>
    );
  }

  const serchFilter = (text) => {
    if (text) {
      const newcall = callcataloge.filter((item) => {
        const namecall = item.name ? item.name.toLowerCase() : "".toLowerCase();
        const textData = text.toLowerCase();
        return namecall.indexOf(textData) > -1;
      });
      setCatalog(newcall);
      setSearchData(text);
    } else {
      setCatalog(resetSearch);
      setSearchData(text);
    }
  };

  function Listcataloges() {
    const _renderCataloge = ({ item }) => {
      return (
        <SafeAreaView style={{ flex: 1 }}>
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
        buttonStyle={{ backgroundColor: "#bf2132"}}
      >
        <SpeedDial.Action
          icon={{ name: "home", color: "#fff" }}
          title="Home"
          onPress={() => {
            navigation.navigate("Home"),setFabOpen(!fabopen)
          }}
          buttonStyle={{ backgroundColor: "#bf2132"}}
        />
         <SpeedDial.Action
          icon={{ name: "login", color: "#fff" }}
          title="Login"
          onPress={() => {
            navigation.navigate("Login"),setFabOpen(!fabopen)
          }}
          buttonStyle={{ backgroundColor: "#bf2132"}}
        />
      </SpeedDial>
    );
  }
  
  return (
   
      <SafeAreaView style={styles.container}>
        {Header()}
        {Listcataloges()}
        {fab_g()}
      </SafeAreaView>



  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  fabG: {
    backgroundColor: "#bf2132",
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