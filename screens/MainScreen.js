// MainScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ContactUsScreen from '../screens/ContactUsScreen'; // Import the ContactUsScreen
import DogBreedGuideScreen from '../screens/DogBreedGuideScreen';

const MainScreen = () => {
  const navigation = useNavigation();

  const [headingText, setHeadingText] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const heading = 'PawFect Match';
  const carouselImages = [
    require('../assets/carousel_image_1.jpg'),
    require('../assets/carousel_image_2.jpg'),
    require('../assets/carousel_image_3.jpg'),
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setHeadingText(heading.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > heading.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get window width
  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.carouselContainer, { marginTop: 50 }]}>
          <Image
            source={carouselImages[carouselIndex]}
            style={styles.carouselImage}
          />
        </View>
        <Text style={[styles.heading, { textAlign: 'center' }]}>{headingText}</Text>
        <Text style={styles.description}>
          PawFectMatch is designed to streamline the process of connecting dog owners with prospective breeding partners.
        </Text>
        <View style={styles.divider}></View>
        <Text style={styles.subheading}>Explore more with us!</Text>

        {/* Flash card 1 */}
        <View style={styles.flashCard}>
          <Image
            source={require('../assets/flash_card_image_1.jpg')}
            style={styles.flashCardImage}
          />
          <Text style={styles.flashCardDescription}>
          This platform provides a centralized hub where dog breeders can facilitate communication with interested parties
          </Text>
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => navigation.navigate('AboutUs')}
          >
            <Text style={styles.seeMoreButtonText}>See More</Text>
          </TouchableOpacity>
        </View>

        {/* Flash card 2 */}
        <View style={styles.flashCard}>
          <Image
            source={require('../assets/flash_card_image_2.jpg')}
            style={styles.flashCardImage}
          />
          <Text style={styles.flashCardDescription}>
          Provide a simple system for users to leave feedback or rate their experience.
          </Text>
          {/* Update onPress to navigate to ContactUsScreen */}
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => navigation.navigate('ContactUs')}
          >
            <Text style={styles.seeMoreButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Flash card 3 for Dog Breed Guide */}
<View style={styles.flashCard}>
  <Image
    source={require('../assets/dog_breed_guide_image.jpg')}
    style={styles.flashCardImage}
  />
  <Text style={styles.flashCardDescription}>
    Explore various dog breeds and find your perfect match with our comprehensive dog breed guide.
  </Text>
  <TouchableOpacity
    style={styles.seeMoreButton}
    onPress={() => navigation.navigate('DogBreedGuide')}
  >
    <Text style={styles.seeMoreButtonText}>Dog Breed Guide</Text>
  </TouchableOpacity>
</View>


        {/* Add your additional content here */}
      </ScrollView>
      {/* Bottom navigation bar */}
      <View style={styles.bottomNavbar}>
        <TouchableOpacity onPress={() => navigation.navigate('profiledetail')} style={styles.navButton}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MainScreen')} style={{ flex: 1, alignItems: 'center' }}>
          <Ionicons name="home-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navButton}>
          <Image
            style={{ height: 60, width: 60 }}
            source={require('../assets/logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.navButton}>
          <Ionicons name="chatbubbles-sharp" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Modal')} style={styles.navButton}>
          <Ionicons name="apps-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4c4', // Change background color to #ffe4c4
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Adjust according to the height of your bottom navigation bar
  },
  carouselContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 30, // Add border radius to the corners of the carousel image
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  subheading: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: 'black',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    width: '90%',
    marginBottom: 20, // Adjust marginBottom
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
  flashCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  flashCardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  flashCardDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  seeMoreButton: {
    backgroundColor: '#cd853f',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  seeMoreButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MainScreen;
