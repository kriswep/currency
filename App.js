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
    if (!isNaN(number) && data) {
      setBaseAmount(number);
      setTargetAmount((number * data.rates[target]).toFixed(2));
    }
  };
  const calculateFromTarget = (number) => {
    if (!isNaN(number) && data) {
      setBaseAmount((number / data.rates[target]).toFixed(2));
      setTargetAmount(number);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text>Uh Oh, an error happened...</Text>}

      {data && (
        <>
          <View>
            <TextInput
              value={base}
              onChangeText={(text) => setBase(text.toUpperCase())}
            />
            <TextInput
              style={styles.currencyAmount}
              keyboardType="numeric"
              value={baseAmount}
              onChangeText={calculateFromBase}
            />
          </View>
          <View>
            <TextInput
              value={target}
              onChangeText={(text) => setTarget(text.toUpperCase())}
            />
            <TextInput
              style={styles.currencyAmount}
              keyboardType="numeric"
              value={targetAmount}
              onChangeText={calculateFromTarget}
            />
          </View>
        </>
      )}
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
  currencyAmount: {
    fontSize: 32,
    padding: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
});
