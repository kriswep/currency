import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useQuery } from 'react-query';

export default function App() {
  const [base, setBase] = useState('EUR');
  const [target, setTarget] = useState('USD');

  const [baseAmount, setBaseAmount] = useState('1');
  const [targetAmount, setTargetAmount] = useState('0');

  const { _, data, error } = useQuery(
    ['latest', base, target],
    fetchCurrencies,
  );

  useEffect(() => calculateFromBase(baseAmount), [data]);

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
          <TextInput
            autoCapitalize="characters"
            style={styles.currency}
            value={base}
            onChangeText={setBase}
          />
          <TextInput
            style={styles.currencyAmount}
            keyboardType="numeric"
            value={baseAmount}
            onChangeText={calculateFromBase}
          />
        </View>
        <View style={styles.currencyContainer}>
          <TextInput
            autoCapitalize="characters"
            style={styles.currency}
            value={target}
            onChangeText={setTarget}
          />
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
