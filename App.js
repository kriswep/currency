import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useQuery } from 'react-query';

export default function App() {
  const [base, setBase] = useState('EUR');
  const [target, setTarget] = useState('USD');

  const { _, data, error } = useQuery(
    ['latest', base, target],
    fetchCurrencies,
  );
  return (
    <View style={styles.container}>
      <Text>Choose currencies!</Text>
      <TextInput
        value={base}
        onChangeText={text => setBase(text.toUpperCase())}
      />
      <TextInput
        value={target}
        onChangeText={text => setTarget(text.toUpperCase())}
      />

      {error && <Text>Uh Oh, an error happened...</Text>}
      {data && <Text>{JSON.stringify(data)}</Text>}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
