import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import CurrencySelector from './screens/CurrencySelector';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Currency Convertor' }}
        />
        <Stack.Screen
          name="Currency"
          component={CurrencySelector}
          options={{ title: 'Select a Currency' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
