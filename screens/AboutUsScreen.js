import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AboutUsScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.aboutContainer}>
          <Text style={styles.mainHeader}>PawFect Match</Text>
          <Text style={styles.paraStyle}>Pawsitively Perfect Breeding! 😃</Text>

          <View style={styles.imageContainer}>
            <Image
              style={styles.imgStyle}
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/009/651/674/original/cute-dog-logo-free-vector.jpg",
              }}
            />
          </View>

          <View style={styles.aboutLayout}>
            <Text style={styles.aboutSubHeader}>About me</Text>
            <Text style={[styles.paraStyle, styles.aboutPara]}>
            The primary objective of the Pawfectmatch is to simplify the process of finding and connecting with dogs for breeding purposes. By offering a user-friendly platform fo dog owners and breeders to interact the system aims to facilitate successful breeding partnerships while ensuring transparency.
            </Text>
          </View>

          <Text style={styles.mainHeader}>Follow us on Social Network</Text>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                Linking.openURL("https://www.facebook.com/rosemarie.p.tan/")
              }>
              <Image
                style={styles.iconStyle}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                Linking.openURL("https://www.facebook.com/thapatechnical")
              }>
              <Image
                style={styles.iconStyle}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1384/1384053.png",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => Linking.openURL("https://discord.gg/AN8ThRBXtY")}>
              <Image
                style={styles.iconStyle}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/906/906361.png",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffe4c4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  backButton: {
    paddingHorizontal: 2,
    marginRight: 1,
    transform: [{ scaleX: 2 }], // Scale horizontally
    transform: [{ scaleY: 2 }],
  },
  backButtonText: {
    fontSize: 30,
    color: '#cd853f', // Orange color
  },
  aboutContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  mainHeader: {
    fontSize: 18,
    color: "#344055",
    fontWeight: "500",
    marginBottom: 10,
  },
  paraStyle: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  imgStyle: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  aboutLayout: {
    backgroundColor: "#4c5dab",
    paddingHorizontal: 30,
    marginVertical: 20,
    paddingVertical: 15,
    width: '80%',
    borderRadius: 10,
  },
  aboutSubHeader: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 15,
    textAlign: 'center',
  },
  aboutPara: {
    color: "#fff",
    textAlign: 'center',
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#cd853f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: "70%",
    height: "70%",
    aspectRatio: 1,
  },
});

export default AboutUsScreen;
