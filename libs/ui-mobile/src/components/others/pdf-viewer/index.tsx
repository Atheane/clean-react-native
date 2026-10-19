import { View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
// import { ServerError } from '@clean-rn/shared/infrastructure';

type IProps = {
  uri: string;
  // handleError: (error: unknown) => void;
};

const PdfResource = { uri: 'https://example.com/assets/docs/cgu.pdf', cache: true };

export const PdfViewer = (props: IProps) => {
  // const handleError = (event: any) => {
  //   props.handleError(event);
  // };

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{ uri: props.uri, cache: true }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
