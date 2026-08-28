import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store';

import LoginScreen from './src/screens/LoginScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

function MainApp() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
        ) : (
          <>
            {/* Escondemos a barra branca padrão aqui: */}
            <Stack.Screen 
              name="Home" 
              component={ProductListScreen} 
              options={{ headerShown: false }} 
            />
            {/* Deixamos a tela de detalhes com a cor do seu Figma */}
            <Stack.Screen 
              name="ProductDetails" 
              component={ProductDetailsScreen} 
              options={{ 
                title: 'Detalhes',
                headerStyle: { backgroundColor: '#4F5671' },
                headerTintColor: '#fff'
              }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}