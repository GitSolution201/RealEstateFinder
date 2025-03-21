import React from 'react';
import { View, Text, SafeAreaView, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import CustomButton from './CustomButton';

interface Place {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface GooglePlacesSearchProps {
  onPlaceSelect?: (data: Place, details: any | null) => void;
  onContinue?: () => void;
}

export default function GooglePlacesSearch({ onPlaceSelect, onContinue }: GooglePlacesSearchProps) {
  const handlePlaceSelect = (data: Place, details: any | null = null) => {
    console.log('Selected place:', data);
    console.log('Place details:', details);
    onPlaceSelect?.(data, details);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className={`flex-1 ${Platform.OS === 'android' ? 'pt-6' : ''}`}>
        <View className="flex-1 px-5">
        
          <View className="">
            <GooglePlacesAutocomplete
              placeholder="Search for a place"
              onPress={handlePlaceSelect}
              query={{
                key: 'YOUR_GOOGLE_PLACES_API_KEY',
                language: 'en',
              }}
              styles={{
                container: {
                  flex: 0,
                  width: '100%',
                  zIndex: 1,
                },
                textInput: {
                  height: 55,
                  borderWidth: 1,
                  borderColor: '#E8E8E8',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  backgroundColor: '#F8F8F8',
                  fontFamily: 'Rubik-Regular',
                },
                listView: {
                  borderWidth: 1,
                  borderColor: '#E8E8E8',
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  marginTop: 8,
                  position: 'absolute',
                  top: 60,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  elevation: 3,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                },
                row: {
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E8E8E8',
                },
                description: {
                  fontSize: 15,
                  fontFamily: 'Rubik-Regular',
                  color: '#333',
                },
              }}
              fetchDetails={true}
              enablePoweredByContainer={false}
              debounce={300}
              minLength={2}
              enableHighAccuracyLocation={true}
              timeout={20000}
              onFail={error => console.warn(error)}
              onNotFound={() => console.warn('no results found')}
              listViewDisplayed={false}
              keyboardShouldPersistTaps="handled"
              textInputProps={{
                placeholderTextColor: '#666',
                returnKeyType: "search",
                autoCorrect: false,
                autoCapitalize: "none"
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 