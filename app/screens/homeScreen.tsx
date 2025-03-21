import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  GestureResponderEvent,
  ImageSourcePropType,
  Animated,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface Card {
  id: number;
  images: ImageSourcePropType[];
  price: string;
  details: string;
  address: string;
  isFavorite: boolean;
}

interface ImageIndices {
  [key: number]: number;
}

const NoMoreCards = ({ onRefresh }: { onRefresh: () => void }) => (
  <View style={styles.noMoreCardsContainer}>
    <Ionicons name="home" size={60} color="#ccc" />
    <Text style={styles.noMoreCardsTitle}>No More Properties</Text>
    <Text style={styles.noMoreCardsText}>
      We've run out of properties to show you.{'\n'}
      Check back later for new listings!
    </Text>
    <TouchableOpacity 
      style={styles.refreshButton}
      onPress={onRefresh}
    >
      <Text style={styles.refreshButtonText}>Refresh Listings</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageIndices, setImageIndices] = useState<ImageIndices>({});
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isOutOfCards, setIsOutOfCards] = useState(false);

  const cards: Card[] = [
    {
      id: 1,
      images: [
        require('../../assets/images/house4.png'),
        require('../../assets/images/poolhouse.png'),
        require('../../assets/images/japan.png'),
      ],
      price: '$3,500',
      details: '2 bds | 1 ba | 1,250 sq ft',
      address: '2345 Apple Way, San Francisco, CA 8658',
      isFavorite: false,
    },
    {
      id: 2,
      images: [
        require('../../assets/images/house2.png'),
        require('../../assets/images/japan.png'),
      ],
      price: '$4,200',
      details: '3 bds | 2 ba | 1,500 sq ft',
      address: '456 Elm Street, Los Angeles, CA 90001',
      isFavorite: false,
    },
    {
      id: 3,
      images: [
        require('../../assets/images/house1.png'),
        require('../../assets/images/poolhouse.png'),
        require('../../assets/images/japan.png'),
      ],
      price: '$5,800',
      details: '4 bds | 3 ba | 2,100 sq ft',
      address: '789 Oak Road, San Diego, CA 92101',
      isFavorite: false,
    },
  ];

  const onSwiped = (): void => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= cards.length) {
      setIsOutOfCards(true);
      return;
    }
    
    setCurrentIndex(nextIndex);
    setImageIndices(prev => ({
      ...prev,
      [nextIndex]: 0
    }));
  };

  const handleImagePress = (event: GestureResponderEvent, cardId: number): void => {
    const { locationX } = event.nativeEvent;
    const currentCard = cards.find(card => card.id === cardId);
    
    if (!currentCard) return;
    
    setImageIndices(prev => {
      const currentImageIndex = prev[cardId] || 0;
      let newIndex = currentImageIndex;

      if (locationX > width / 2) {
        // Right side tap - next image
        newIndex = currentImageIndex < currentCard.images.length - 1 
          ? currentImageIndex + 1 
          : currentImageIndex;
      } else {
        // Left side tap - previous image
        newIndex = currentImageIndex > 0 
          ? currentImageIndex - 1 
          : currentImageIndex;
      }

      return {
        ...prev,
        [cardId]: newIndex
      };
    });
  };

  const handleSwipeStart = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleRefresh = () => {
    setCurrentIndex(0);
    setIsOutOfCards(false);
    setImageIndices({});
  };

  const renderCard = (card: Card): React.ReactElement => {
    const currentImageIndex = imageIndices[card.id] || 0;

    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          {/* Image Container */}
          <View style={styles.imageContainer}>
            <TouchableOpacity 
              activeOpacity={1}
              onPress={(event) => handleImagePress(event, card.id)}
              style={styles.imageTouchable}
            >
              <Image 
                source={card.images[currentImageIndex]} 
                style={styles.image}
              />

              {/* Image indicators */}
              <View style={styles.imageIndicators}>
                {card.images.map((_, index) => (
                  <View
                    key={`${card.id}-${index}`}
                    style={[
                      styles.indicator,
                      currentImageIndex === index && styles.activeIndicator,
                    ]}
                  />
                ))}
              </View>

              {/* Info button */}
              <TouchableOpacity 
                style={styles.infoButton}
                onPress={() => alert('Property Details\n\n• Year built: 2020\n• HOA: $350/month\n• Parking: 2 cars\n• Utilities included\n• Available from: Feb 1, 2024')}
              >
                <Ionicons name="information-circle" size={24} color="white" />
              </TouchableOpacity>

              {/* Heart button */}
              <TouchableOpacity style={styles.heartButton}>
                <Ionicons name="heart-outline" size={24} color="white" />
              </TouchableOpacity>

              {/* Bottom info container */}
              <View style={styles.bottomInfo}>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${card.price}</Text>
                  <Text style={styles.monthly}>monthly</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.details}>{card.details}</Text>
                  <Text style={styles.address}>{card.address}</Text>
                </View>
              </View>

              {/* Action buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.likeButton}>
                  <Ionicons name="heart" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.crossButton}>
                  <Ionicons name="close" size={24} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.rentOwnSwitch}>
          <TouchableOpacity style={styles.rentButton}>
            <Text style={styles.activeSwitchText}>Rent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ownButton}>
            <Text style={styles.inactiveSwitchText}>Own</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/favicon.png')}
            style={styles.logo}
          />
        </View>
      </View>

      {/* Swiper */}
      <View style={styles.swiperContainer}>
        {!isOutOfCards ? (
          <Swiper
            cards={cards}
            renderCard={renderCard}
            onSwiped={onSwiped}
            onSwipedLeft={(cardIndex: number) => {
              handleSwipeStart('left');
            }}
            onSwipedRight={(cardIndex: number) => {
              handleSwipeStart('right');
            }}
            stackSize={2}
            stackScale={8}
            stackSeparation={-20}
            backgroundColor="transparent"
            cardIndex={currentIndex}
            disableTopSwipe
            disableBottomSwipe
          />
        ) : (
          <NoMoreCards onRefresh={handleRefresh} />
        )}
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="heart-outline" size={24} color="#666" />
          <Text style={styles.tabText}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#007AFF" />
          <Text style={styles.tabTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.tabText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => {
            router.push('/screens/profileScreen');
          }}
        >
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'relative',
  },
  rentOwnSwitch: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 30,
    padding: 3,
    width: 120,
  },
  rentButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    width: 65,
    alignItems: 'center',
  },
  ownButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    width: 65,
    alignItems: 'center',
  },
  activeSwitchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  inactiveSwitchText: {
    color: '#9ca3af',
    fontWeight: 'bold',
    fontSize: 13,
  },
  logoContainer: {
    position: 'absolute',
    left: '90%',
    transform: [{ translateX: -35 }],
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 70,
    resizeMode: 'contain',
  },
  swiperContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 80,
    marginTop: -20,
  },
  card: {
    height: height * 0.70,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: -10,
  },
  cardContent: {
    flex: 1,
  },
  imageContainer: {
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageTouchable: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 4,
  },
  monthly: {
    fontSize: 16,
    color: '#fff',
  },
  detailsContainer: {
    gap: 4,
  },
  details: {
    fontSize: 14,
    color: '#fff',
  },
  address: {
    fontSize: 14,
    color: '#fff',
  },
  imageIndicators: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
  },
  infoButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 2,
  },
  heartButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  tabTextActive: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
  },
  swipeOverlay: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-30deg' }],
  },
  overlayText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center',
  },
  likeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  crossButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noMoreCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  noMoreCardsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  noMoreCardsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;