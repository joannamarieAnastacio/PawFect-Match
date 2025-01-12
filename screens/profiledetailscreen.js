import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CommonActions } from '@react-navigation/native';


const ProfileDetailScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (user) { // Check if user is not null or undefined
          const profileDoc = await getDoc(doc(db, "users", user.uid));
          if (profileDoc.exists()) {
            setProfileData(profileDoc.data());
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfileData();
  }, [user]); // Make sure to include user in the dependency array
  

  const handleLogout = () => {
    logout();
    console.log("Logging out and navigating to Login screen...");
    navigation.navigate("Login");
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Profile</Text>
      {profileData ? (
        <>
          <View style={styles.profileContent}>
            <Image
              style={styles.profileImage}
              source={{ uri: profileData.photoURL }}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.displayName}>{profileData.displayName}</Text>
              <Text style={styles.detailText}>Description: {profileData.job}</Text>
              <Text style={styles.detailText}>Age: {profileData.age}</Text>
              <Text style={styles.detailText}>Gender: {profileData.gender}</Text>
              <Text style={styles.detailText}>Dog Breed: {profileData.dogBreed}</Text>
            </View>
          </View>
        </>
      ) : (
        <Text>Loading profile...</Text>
      )}
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

       {/* Bottom navigation bar */}
     <View style={styles.bottomNavbar}>
        <TouchableOpacity onPress={() => navigation.navigate("profiledetail")} style={styles.navButton}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MainScreen")} style={{ flex: 1, alignItems: "center" }}>
  <Ionicons name="home-outline" size={30} color="black" />
</TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.navButton}>
        <Image
            style={{ height: 60, width: 60 }}
            source={require("../assets/logo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={styles.navButton}>
          <Ionicons name="chatbubbles-sharp" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")} style={styles.navButton}>
        <Ionicons name="apps-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe4c4",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "center",
    marginTop: 20,
  },
  profileContent: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: "center",
  },
  displayName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 40,
    alignSelf: "center",
    backgroundColor: "#deb887",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNavbar: {
    backgroundColor: "#cd853f",
    padding: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
  },
});

export default ProfileDetailScreen;
