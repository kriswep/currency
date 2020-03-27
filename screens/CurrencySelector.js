import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function CurrencySelector(props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <CurrencyField value="BGN" text="Bulgarian Lev" {...props} />
      <CurrencyField value="CAD" text="Canadian Dollar" {...props} />
      <CurrencyField value="CHF" text="Swiss Franc" {...props} />
      <CurrencyField value="CNY" text="Chinese Yuan Renminbi" {...props} />
      <CurrencyField value="CZK" text="Czech Koruna" {...props} />
      <CurrencyField value="DKK" text="Danish Krone" {...props} />
      <CurrencyField value="EUR" text="Euro" {...props} />
      <CurrencyField value="GBP" text="British Pound" {...props} />
      <CurrencyField value="HKD" text="Hong Kong Dollar" {...props} />
      <CurrencyField value="HUF" text="Hungarian Forint" {...props} />
      <CurrencyField value="JPY" text="Japanese Yen" {...props} />
      <CurrencyField value="NOK" text="Norwegian Krone" {...props} />
      <CurrencyField value="PLN" text="Polish Zloty" {...props} />
      <CurrencyField value="RUB" text="Russian Ruble" {...props} />
      <CurrencyField value="USD" text="US Dollar" {...props} />
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
