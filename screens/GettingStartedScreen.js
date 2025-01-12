import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

const GettingStartedScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={tw.style("flex-1 justify-center items-center")}>
      <Text style={tw.style("font-bold text-2xl mb-4")}>Get Started</Text>
      <TouchableOpacity
        style={tw.style("bg-black py-3 px-8 rounded-lg")}
        onPress={handleGetStarted}
      >
        <Text style={tw.style("text-white font-bold")}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GettingStartedScreen;
