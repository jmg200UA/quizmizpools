// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './screens/Inicio';
import Prueba from './screens/Prueba';
import Quiniela from './screens/Quiniela'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Prueba" component={Prueba} />
        <Stack.Screen name="Quiniela" component={Quiniela} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
