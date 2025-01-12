import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

const BottomNavbar = () => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "#ffe4c4", padding: 3, flexDirection: "row", justifyContent: "space-between", alignItems: "center", position: "absolute", bottom: 0, width: '100%' }}>
      <TouchableOpacity onPress={() => navigation.navigate("profiledetail")} style={{ flex: 1, alignItems: "center" }}>
        <Ionicons name="person-circle-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Modal")} style={{ flex: 1, alignItems: "center" }}>
        <Image
          style={{ height: 60, width: 60 }}
          source={require("../assets/logo.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ flex: 1, alignItems: "center" }}>
        <Ionicons name="home-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={{ flex: 1, alignItems: "center" }}>
        <Ionicons name="chatbubbles-sharp" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;
