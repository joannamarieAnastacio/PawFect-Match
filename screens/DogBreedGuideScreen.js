import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Linking, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DogBreedGuideScreen = () => {
  const navigation = useNavigation();
  const [isNewBreedersOpen, setIsNewBreedersOpen] = useState(false);
  const [isExperiencedBreedersOpen, setIsExperiencedBreedersOpen] = useState(false);
  const newBreedersButtonRef = useRef(null);
  const experiencedBreedersButtonRef = useRef(null);

  const toggleNewBreedersAccordion = () => {
    setIsNewBreedersOpen(!isNewBreedersOpen);
  };

  const toggleExperiencedBreedersAccordion = () => {
    setIsExperiencedBreedersOpen(!isExperiencedBreedersOpen);
  };

  // Calculate button width based on content width
  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth * 0.8) - 30; // 30 is for padding and margin

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dog Breed Guide</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.aboutContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imgStyle}
              source={{
                uri: "https://img.money.com/2021/09/Explainer-Best-Dog-Breed-For-Me.jpg?quality=60&w=1600",
              }}
            />
          </View>
          <Text style={styles.mainHeader}>Responsible Dog Breeding Guidelines</Text>

          <View style={styles.doContainer}>
            <Text style={styles.doHeader}>The Do's</Text>
            <Text style={styles.doText}>• Health Screening: Prioritize the health of both parent dogs.</Text>
            <Text style={styles.doText}>• Temperament Assessment: Assess the temperament and behavior of both parent dogs.</Text>
            <Text style={styles.doText}>• Education: Educate about the breed standards, characteristics, and potential genetic issues.</Text>
            <Text style={styles.doText}>• Responsible Ownership: Ensure that both the male and female dogs are physically and mentally mature.</Text>
            <Text style={styles.doText}>• Legal Compliance: Adhere to all local laws and regulations related to dog breeding.</Text>
          </View>

          <View style={styles.dontContainer}>
            <Text style={styles.dontHeader}>The Don'ts</Text>
            <Text style={styles.dontText}>• Avoid Overbreeding: Don't breed dogs excessively or indiscriminately.</Text>
            <Text style={styles.dontText}>• Inbreeding: Avoid breeding closely related dogs.</Text>
            <Text style={styles.dontText}>• Ignoring Health Issues: Don't overlook health issues in either parent dog.</Text>
            <Text style={styles.dontText}>• Puppy Mills: Never support or participate in puppy mills or irresponsible breeding practices.</Text>
            <Text style={styles.dontText}>• Misrepresentation: Avoid misrepresenting the characteristics or lineage of the dogs you're breeding.</Text>
          </View>

          {/* Accordion for New Breeders */}
          <TouchableOpacity
            ref={newBreedersButtonRef}
            style={[styles.accordionHeader, { width: buttonWidth }]}
            onPress={toggleNewBreedersAccordion}>
            <Text style={styles.accordionHeaderText}>For New Breeders</Text>
          </TouchableOpacity>
          {isNewBreedersOpen && (
            <View style={[styles.accordionContent, { backgroundColor: '#d2b48c', borderRadius: 10 }]}>
              <Text style={styles.doText}>Research Breeds: Take time to research breeds thoroughly, focusing on health, temperament, and care needs.</Text>
              <Text style={styles.doText}>Start Small: Begin with breeds you're familiar with to better understand their needs and characteristics.</Text>
              <Text style={styles.doText}>Prioritize Health: Select breeding pairs with good health records and desirable temperaments to produce healthy puppies.</Text>
            </View>
          )}

          {/* Accordion for Experienced Breeders */}
          <TouchableOpacity
            ref={experiencedBreedersButtonRef}
            style={[styles.accordionHeader, { width: buttonWidth }]}
            onPress={toggleExperiencedBreedersAccordion}>
            <Text style={styles.accordionHeaderText}>For Experienced Breeders</Text>
          </TouchableOpacity>
          {isExperiencedBreedersOpen && (
            <View style={[styles.accordionContent, { backgroundColor: '#d2b48c', borderRadius: 10 }]}>
              <Text style={styles.doText}>Explore New Combinations: Experiment with new breed combinations, considering market demand and maintaining breed standards.</Text>
              <Text style={styles.doText}>Collaborate: Partner with other breeders to exchange knowledge and resources, enhancing breeding practices.</Text>
              <Text style={styles.doText}>Stay Informed: Keep up-to-date with advancements in veterinary care, breeding techniques, and genetics to improve practices.</Text>
            </View>
          )}
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
    width: 350,
    height: 200,
    borderRadius: 5,
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
  doContainer: {
    backgroundColor: '#c9e4ca',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '80%', // Adjusted width
  },
  dontContainer: {
    backgroundColor: '#f7c5c0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '80%', // Adjusted width
  },
  doHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dontHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  doText: {
    fontSize: 16,
    marginBottom: 5,
  },
  dontText: {
    fontSize: 16,
    marginBottom: 5,
  },
  accordionHeader: {
    backgroundColor: '#8B4513', // Brown color
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    borderRadius: 5, // Border radius
    alignItems: 'center', // Align content horizontally
    justifyContent: 'center', // Align content vertically
  },
  accordionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White color
  },
  accordionContent: {
    backgroundColor: '#D2B48C', // Light brown color
    padding: 10,
    marginBottom: 10,
    borderRadius: 5, // Border radius
  },
});

export default DogBreedGuideScreen;
