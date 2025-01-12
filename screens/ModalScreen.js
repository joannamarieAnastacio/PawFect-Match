import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, Dimensions, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, timestamp } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [gender, setGender] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [genderOptionsVisible, setGenderOptionsVisible] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileDoc = await getDoc(doc(db, "users", user.uid));
        if (profileDoc.exists()) {
          const profileData = profileDoc.data();
          setImage(profileData.photoURL || "");
          setAge(profileData.age || "");
          setJob(profileData.job || "");
          setGender(profileData.gender || "");
          setDogBreed(profileData.dogBreed || "");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [user.uid]);

  const incompleteForm = !image || !age || !job || !gender || !dogBreed;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job,
      age,
      gender,
      dogBreed,
      timestamp,
    })
      .then(() => {
        // Show success message
        Alert.alert("Success", "Profile updated successfully");
        // Clear input fields or perform any other actions as needed
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const toggleGenderOptions = () => {
    setGenderOptionsVisible(!genderOptionsVisible);
  };

  const selectGender = (value) => {
    setGender(value);
    toggleGenderOptions();
  };

  return (
    <View style={[tw`flex-1`, { backgroundColor: "#ffe4c4" }]}>
  <ScrollView contentContainerStyle={[tw`flex-grow items-center pt-1 pb-16`, { backgroundColor: "#ffe4c4" }]}>
        <Image
          style={tw`h-20 w-full`}
          resizeMode="contain"
          source={require("../assets/text-logo.png")}
        />
        <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>
          Welcome {user.displayName}
        </Text>

        {/* Form components go here */}
        <Text style={tw`text-center p-4 font-bold text-red-400`}>
          Step 1: The Profile Pic
        </Text>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
          ) : (
            <Text>Select a photo</Text>
          )}
        </TouchableOpacity>

        <Text style={tw`text-center p-4 font-bold text-red-400`}>
          Step 2: The Description
        </Text>
        <TextInput
          placeholder="Enter your description"
          style={tw`text-center text-xl pb-2`}
          onChangeText={setJob}
          value={job}
        />

        <Text style={tw`text-center p-4 font-bold text-red-400`}>
          Step 3: The Age
        </Text>
        <TextInput
          placeholder="Enter your age"
          style={tw`text-center text-xl pb-2`}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          maxLength={2}
        />

        <Text style={tw`text-center p-4 font-bold text-red-400`}>
          Step 4: The Gender
        </Text>
        <TouchableOpacity onPress={toggleGenderOptions}>
          <Text style={tw`text-center text-xl pb-2`}>{gender || "Select gender"}</Text>
        </TouchableOpacity>
        {genderOptionsVisible && (
          <View>
            <TouchableOpacity onPress={() => selectGender("male")}>
              <Text style={tw`text-center text-xl pb-2`}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectGender("female")}>
              <Text style={tw`text-center text-xl pb-2`}>Female</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={tw`text-center p-4 font-bold text-red-400`}>
          Step 5: The Dog Breed
        </Text>
        <TextInput
          placeholder="Enter your dog breed"
          style={tw`text-center text-xl pb-2`}
          value={dogBreed}
          onChangeText={setDogBreed}
        />

        <TouchableOpacity
          disabled={incompleteForm}
          style={tw`w-64 p-3 rounded-xl bg-red-400 ${incompleteForm && "bg-gray-400"}`}
          onPress={updateUserProfile}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom navigation bar */}
      <View style={{ backgroundColor: "#cd853f", padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

        <TouchableOpacity onPress={() => navigation.navigate("profiledetail")} style={tw`flex-1 items-center`}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MainScreen")} style={tw`flex-1 items-center`}>
          <Ionicons name="home-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={tw`flex-1 items-center`}>
          <Image
            style={tw`h-12 w-12`}
            source={require("../assets/logo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={tw`flex-1 items-center`}>
          <Ionicons name="chatbubbles-sharp" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")} style={tw`flex-1 items-center`}>
          <Ionicons name="apps-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalScreen;
