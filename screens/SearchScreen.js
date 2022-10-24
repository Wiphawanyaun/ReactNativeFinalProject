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
import { SearchBar } from "react-native-elements";

import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchScreen = ({ navigation }) => {

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
      <SafeAreaView >
        <SearchBar
          value={searchData}
          placeholder="Search Here"
          onChangeText={(text) => serchFilter(text)}
          inputContainerStyle={{ borderRadius: 50 }}
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
            <Text style={styles.list_name_type}>{item.type}</Text>
            <View style={styles.con_list_detail}>
              <Text style={styles.text_list_name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      );
    };
    return (
      <View style={{ marginBottom: 50 }}>
        <FlatList
          data={cataloge}
          keyExtractor={(item, index) => item.id}
          renderItem={_renderCataloge}
          refreshing={loading}
          onRefresh={_onRefresh}
        />
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      {Header()}
      {Listcataloges()}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },

  container_cataloge: {
    flex: 1,
    backgroundColor: "#ebe6e7",
  },
  icon: {
    position: "absolute",
    top: 20,
    right: 20,
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

  text_list_detail: {
    fontSize: 18,
  },
});
