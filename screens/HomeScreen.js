import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { useQuery } from 'react-query';

export default function HomeScreen({ navigation, route }) {
  console.log(route.params);
  const [base, setBase] = useState(route.params?.baseCurrency || 'EUR');
  const [target, setTarget] = useState(route.params?.targetCurrency || 'USD');

  const [baseAmount, setBaseAmount] = useState('1');
  const [targetAmount, setTargetAmount] = useState('0');

  const { _, data, error } = useQuery(
    ['latest', base, target],
    fetchCurrencies,
  );

  //  Recalculate when we got new data from the API
  useEffect(() => calculateFromBase(baseAmount), [data]);

  // update base currency from route props
  useEffect(() => {
    if (route.params?.baseCurrency) {
      setBase(route.params?.baseCurrency);
    }
  }, [route.params?.baseCurrency]);

  // update target currency from route props
  useEffect(() => {
    if (route.params?.targetCurrency) {
      setTarget(route.params?.targetCurrency);
    }
  }, [route.params?.targetCurrency]);

  const calculateFromBase = (number) => {
    if (!isNaN(number) && data && data.rates) {
      setBaseAmount(number);
      const newTargetAmount = (number * data.rates[target]).toFixed(2);
      setTargetAmount(isNaN(newTargetAmount) ? 0 : newTargetAmount);
    }
  };
  const calculateFromTarget = (number) => {
    if (!isNaN(number) && data && data.rates) {
      const newBaseAmount = (number / data.rates[target]).toFixed(2);
      setBaseAmount(isNaN(newBaseAmount) ? 0 : newBaseAmount);
      setTargetAmount(number);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text>Uh Oh, an error happened...</Text>}
      <>
        <View style={styles.currencyContainer}>
          <TouchableOpacity
            style={styles.currency}
            onPress={() =>
              navigation.navigate('Currency', { forTarget: false })
            }
          >
            <Text>{base}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.currencyAmount}
            keyboardType="numeric"
            value={baseAmount}
            onChangeText={calculateFromBase}
          />
        </View>
        <View style={styles.currencyContainer}>
          <TouchableOpacity
            style={styles.currency}
            onPress={() => navigation.navigate('Currency', { forTarget: true })}
          >
            <Text>{target}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.currencyAmount}
            keyboardType="numeric"
            value={targetAmount}
            onChangeText={calculateFromTarget}
          />
        </View>
      </>
    </View>
  );
}

const fetchCurrencies = async (_, base, target) => {
  const res = await fetch(
    `https://api.ratesapi.io/api/latest?base=${base}&symbols=${target}`,
  );

  return await res.json();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  currencyContainer: {
    flexBasis: 150,
    margin: 12,
  },
  currency: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  currencyAmount: {
    fontSize: 24,
    padding: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 12,
  },
});
