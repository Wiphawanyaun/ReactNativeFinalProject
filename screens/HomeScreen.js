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
  TextInput,
  SectionList,
} from "react-native";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Video } from "expo-av";
// import { BlurView } from '@react-native-community/blur';
import cake from "../image_Video/cake_noaudio.mp4";

const HomeScreen = ({navigation}) => {
  const [trend, setTrend] = useState([]);
  const [cataloge, setCatalog] = useState([]);


  const video = React.useRef(null);

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

  useEffect(()=>{
      getData();
  },[])

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

  const Header = () => {
    return (

      <Video
        ref={video}
        source={cake} // the video file
        resizeMode="cover"
        shouldPlay
        isLooping={true}
        style={styles.backgroundVideo} // any style you want
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

  // const Blur_trend = ({ item }) => {
  //   return (
  //     <BlurView tint="dark" style={styles.blur_contain}>
  //       <View>
  //         <Text style={styles.blur_text}>{item.name}</Text>
  //         <Blur_trend item={item} />
  //       </View>
  //     </BlurView>
  //   );
  // };

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

  return (
    <ScrollView>
      <SafeAreaView >  

          {Header()}
          {Trend()}
          {Listcataloges()}
      
      </SafeAreaView>
      </ScrollView>
        

  );
  
  
}

export default HomeScreen;

const styles = StyleSheet.create({
    backgroundVideo: {
        position: "absolute",
        top: -3,
        left: 0,
        bottom: 0,
        right: 0,
        width : '100%',
        height:450,
      },
      fabG: {
        backgroundColor: "#bf2132",
      },
      container: {
        flex: 1,
        backgroundColor: "#ebe6e7",
      },
      container_cataloge :{
        flex: 1,
        backgroundColor: "#ebe6e7",
      },
    
      container_trend:{
        backgroundColor: "#ebe6e7",
        marginTop:360,
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
