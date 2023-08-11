import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Barcode } from 'react-native-jsbarcode';

export default function App() {
  return (
    <View style={styles.container}>
      <Barcode value={'1234567890128'} format="ean13" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
