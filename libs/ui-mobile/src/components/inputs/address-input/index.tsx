import 'react-native-get-random-values'; // polyfill for react-native-google-places-autocomplete that depends on uuid. Also add react-native-crypto as a dependency
import { useEffect, useState, useRef, RefAttributes } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { Country, IAddress } from '@clean-rn/user/domain';
import { getLocales } from 'expo-localization';

import { Colors } from '../../../constants';
import { House } from '../../../assets';

type IProps = {
  language: string;
  placeholder: string;
  address: IAddress;
  onAddressSelect: (address: IAddress) => void;
  clearAddress: () => void;
};

const WIDTH = Dimensions.get('window').width;

const regionCode = getLocales()[0]?.regionCode || 'FR';

export const AddressInput = (props: IProps) => {
  const [addressString, setAddressString] = useState<string>('');
  const [cleared, setCleared] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const googlePlacesRef = useRef<RefAttributes<GooglePlacesAutocompleteRef>>(null);

  // if user clear adresse several times in a row, we need to reset the state cleared at false
  useEffect(() => {
    setCleared(false);
  }, [props.address]);

  const handleAddressSelect = async (data: GooglePlaceData) => {
    if (data) {
      try {
        const str = data.structured_formatting.main_text;
        let city = data.structured_formatting.secondary_text.split(',')[0];
        const citySplit = city.split(' ');
        if (citySplit.length > 1) {
          city = citySplit[citySplit.length - 1];
        }
        const json = await Geocoder.from(data.description);
        const zip =
          json.results[0].address_components.find((component) => component.types.includes('postal_code'))
            ?.long_name || '';
        const countryCode =
          json.results[0].address_components.find((component) => component.types.includes('country'))
            ?.short_name || regionCode;
        const country = new Country(countryCode);
        const address: IAddress = {
          str,
          city,
          zip,
          country,
        };
        const addressString = `${str}, ${zip} ${city}, ${country.valueName}`;
        props.onAddressSelect(address);
        googlePlacesRef.current?.setAddressText(addressString);
        setAddressString(addressString);
      } catch (error: unknown) {
        console.log('Erreur lors du géocodage :', error);
        setError(error);
      }
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={{ marginLeft: 16, marginRight: 0, marginTop: 10 }}>
          <House startColor={Colors.primary.lightGreen} endColor={Colors.primary.green} />
        </View>
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          placeholder={props.placeholder}
          onPress={handleAddressSelect}
          textInputProps={{
            onChangeText: (text: string) => {
              if (text === '' && text !== addressString && !cleared) {
                setCleared(true);
                setError(undefined);
                props.clearAddress();
              }
            },
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: props.language,
            types: ['address'],
          }}
          styles={{
            textInputContainer: styles.inputContainer,
            textInput: styles.textInput,
            listView: {
              position: 'absolute',
              top: 60, // Ajustez cette valeur en fonction de la position souhaitée
              left: -60,
              right: 0,
              backgroundColor: 'white',
              zIndex: 1000,
            },
            row: {
              backgroundColor: 'white', // Définit l'arrière-plan de chaque élément de la liste en blanc
            },
          }}
          renderDescription={(row) => row.description}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.8,
    backgroundColor: Colors.primary.lightGrey,
    flexDirection: 'row',
    borderRadius: 8,
  },
  inputContainer: {
    backgroundColor: Colors.primary.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
  },
  textInput: {
    color: Colors.secondary.pink,
    fontSize: 16,
    marginTop: 4,
    marginLeft: 8,
    backgroundColor: Colors.primary.lightGrey,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
});
