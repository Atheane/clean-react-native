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
import { House } from '../../../assets/svg';

type IProps = {
  language: string;
  placeholder: string;
  onAddressSelect: (address: IAddress) => void;
  setDisabled: (value: boolean) => void;
  defaultValue?: IAddress;
};

const WIDTH = Dimensions.get('window').width;

const regionCode = getLocales()[0]?.regionCode || 'FR';
export const AddressInput = (props: IProps) => {
  const [addressString, setAddressString] = useState<string>(
    props.defaultValue
      ? `${props.defaultValue.str}, ${props.defaultValue.zip} ${props.defaultValue.city}, ${props.defaultValue.country.valueName}`
      : '',
  );
  const [cleared, setCleared] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const googlePlacesRef = useRef<RefAttributes<GooglePlacesAutocompleteRef>>(null);

  const handleAddressSelect = async (data: GooglePlaceData) => {
    if (data) {
      try {
        const str = data.structured_formatting.main_text;
        const city = data.structured_formatting.secondary_text.split(',')[0];

        const json = await Geocoder.from(data.description);
        const zip =
          json.results[0].address_components.find((component) => component.types.includes('postal_code'))
            ?.long_name || '';
        const countryCode =
          json.results[0].address_components.find((component) => component.types.includes('country'))
            ?.short_name || regionCode;
        const country = new Country(countryCode);
        // format de l'output attendu
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
        props.setDisabled(false);
      } catch (error: unknown) {
        console.log('Erreur lors du géocodage :', error);
        setError(error);
      }
    }
  };

  useEffect(() => {
    if (props.defaultValue) {
      googlePlacesRef.current?.setAddressText(addressString);
    }
  }, [props, addressString]);

  return (
    <View>
      <View style={styles.container}>
        <View style={{ marginLeft: 16, marginRight: 0, marginTop: 10 }}>
          <House style={{ color: Colors.bank.primary.lightGreen }} />
        </View>
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          placeholder={props.placeholder}
          onPress={handleAddressSelect}
          textInputProps={{
            onChangeText: (text: string) => {
              if (text === '' && text !== addressString && !cleared) {
                console.log('Address cleared :', error);
                setCleared(true);
                props.onAddressSelect({} as IAddress);
                props.setDisabled(true);
                setError(undefined);
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
            listView: { marginLeft: -55, marginRight: 0 },
          }}
          renderDescription={(row) => row.description}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.8,
    backgroundColor: Colors.bank.primary.lightGrey,
    flexDirection: 'row',
    borderRadius: 8,
  },
  inputContainer: {
    backgroundColor: Colors.bank.primary.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
  },
  textInput: {
    color: Colors.bank.secondary.pink,
    fontSize: 16,
    marginTop: 4,
    marginLeft: 8,
    backgroundColor: Colors.bank.primary.lightGrey,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
});
