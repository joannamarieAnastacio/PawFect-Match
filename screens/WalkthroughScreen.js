import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assets/3.png'),
    title: 'Welcome to PawFectMatch!',
    subtitle: 'where connecting dog owners and breeders is made easy',
  },
  {
    id: '2',
    image: require('../assets/2.png'),
    title: 'How to Use?',
    subtitle: 'Simply create your profile, showcase your dogs, and swipe right or tap the heart icon to express interest in potential matches.',
  },
  {
    id: '3',
    image: require('../assets/1.png'),
    title: 'Pawfect Match',
    subtitle: 'Find your PawFect match effortlessly with our matching process, ensuring compatibility and connections.',
  },
];

const WalkthroughScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();

  const updateCurrentSlideIndex = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      ref.current.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      navigation.navigate('Login');
    }
  };

  const Slide = ({ item }) => {
    return (
      <View style={styles.slideContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />
      <TouchableOpacity style={styles.button} onPress={goToNextSlide}>
        <Text style={styles.buttonText}>{currentSlideIndex === slides.length - 1 ? 'GET STARTED' : 'NEXT'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edcfad', // Change the background color
      },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: width, // Set width to the screen width
    marginBottom: height * 0.2, // Add margin at the bottom to avoid overlap with buttons
  },
  image: {
    width: '80%',
    height: height * 0.6,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    position: 'absolute',
    bottom: height * 0.1, // Adjust the distance from the bottom as needed
    alignSelf: 'center',
    backgroundColor: '#4a2a05',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textContainer: {
    maxWidth: '80%', // Adjust the maximum width as needed
    alignItems: 'center',
  },
  
});

export default WalkthroughScreen;
