import {
  Button,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { db, timestamp } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import generateId from "../lib/generateId";
import BottomNavBar from "./BottomNavBar";



const HomeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (snapShot) => {
      console.log(snapShot.data());
      if (!snapShot.exists()) {
        navigation.navigate("Modal");
      }
    });
  
    // Return a function that invokes unsubscribe
    return () => unsubscribe(); 
  }, []);
  

  useEffect(() => {
    let unsub;
  
    const fetchCards = async () => {
      const passesQuerySnapshot = await getDocs(
        collection(db, "users", user.uid, "passes")
      );
      const passes = passesQuerySnapshot.docs.map((doc) => doc.id);
  
      const swipesQuerySnapshot = await getDocs(
        collection(db, "users", user.uid, "swipes")
      );
      const swipes = swipesQuerySnapshot.docs.map((doc) => doc.id);
  
      const passedUserIds = passes.length > 0 ? passes : ["temp"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["temp"];
  
      const filteredUserIds = passedUserIds.concat(swipedUserIds);
  
      // Fetch profiles that are not in passes or swipes
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", filteredUserIds)
        ),
        (snapShot) => {
          const filteredProfiles = snapShot.docs
            .filter((doc) => doc.id !== user.uid) // Exclude current user
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          
          setProfiles(filteredProfiles);
        }
      );
    };
  
    fetchCards();
  
    return unsub;
  }, []);
  
  

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) {
      return;
    }

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) {
      return;
    }

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);
    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);

    try {
      if (!profiles[cardIndex]) {
        return;
      }

      const userSwiped = profiles[cardIndex];
      const loggedInProfile = await (
        await getDoc(doc(db, "users", user.uid))
      ).data();

      console.log("loggedInProfile", loggedInProfile);

      getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
        (docSnap) => {
          if (docSnap.exists()) {
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
            setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
              users: {
                [user.uid]: loggedInProfile,
                [userSwiped.id]: userSwiped,
              },
              usersMatched: [user.uid, userSwiped.id],
              timestamp,
            });

            console.log(loggedInProfile, userSwiped);

            navigation.navigate("Match", {
              loggedInProfile,
              userSwiped,
            });
          } else {
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={[tw.style("flex-1"), { backgroundColor: "#ffe4c4" }]}>
      <View style={tw.style("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe Pass");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe Match");
            swipeRight(cardIndex);
          }}
          backgroundColor="#4FD0E9"
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) => {
            return card ? (
              <View
                key={card.id}
                style={tw.style("bg-white h-3/4 rounded-xl relative")}
              >
                <Image
                  style={tw.style("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photoURL }}
                />
          
                <View
                  style={tw.style(
                    "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl"
                  )}
                >
                  <View>
                    <Text style={tw.style("text-xl font-bold")}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                    <Text>{card.gender}</Text>
                    <Text>{card.breed}</Text> 
                  </View>
                  <Text style={tw.style("text-2xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={tw.style(
                  "relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl"
                )}
              >
                <Text style={tw.style("font-bold pb-5")}>No more profiles</Text>
                <Image
                  style={tw.style("h-20 w-20")}
                  height={100}
                  width={100}
                  source={{
                    uri: "https:cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                  }}
                />
              </View>
            );
          }}
          
        />
      </View>

      <View style={tw.style("flex flex-row justify-evenly")}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw.style(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw.style(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <Entypo name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: "#cd853f", padding: 3, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
  <TouchableOpacity onPress={() => navigation.navigate("profiledetail")} style={{ flex: 1, alignItems: "center" }}>
    <Ionicons name="person-circle-outline" size={30} color="black" />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("MainScreen")} style={{ flex: 1, alignItems: "center" }}>
  <Ionicons name="home-outline" size={30} color="black" />
</TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ flex: 1, alignItems: "center" }}>
  <Image
      style={{ height: 60, width: 60 }}
      source={require("../assets/logo.png")}
    />
        </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={{ flex: 1, alignItems: "center" }}>
    <Ionicons name="chatbubbles-sharp" size={30} color="black" />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("Modal")} style={{ flex: 1, alignItems: "center" }}>
  <Ionicons name="apps-outline" size={30} color="black" />
  </TouchableOpacity>
</View>

    </SafeAreaView>
  );
};

export default HomeScreen;
