import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function CurrencySelector(props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <CurrencyField value="EUR" text="Euro" {...props} />
      <CurrencyField value="USD" text="US Dollar" {...props} />
      <CurrencyField value="CAD" text="Canadian Dollar" {...props} />
    </ScrollView>
  );
}

const CurrencyField = ({ value, text, navigation, route }) => {
  const selectedCurrency = route.params?.forTarget
    ? 'targetCurrency'
    : 'baseCurrency';
  return (
    <TouchableOpacity
      style={styles.currencyField}
      onPress={() => navigation.navigate('Home', { [selectedCurrency]: value })}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  containerContent: {
    flex: 1,
    alignItems: 'center',
  },

  currencyField: {
    fontSize: 24,
    padding: 12,
  },
});
