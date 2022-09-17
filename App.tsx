import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Screens/Home';
import Details from './src/Screens/Details';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AddProduct from './src/Screens/AddProduct';

export type RootStackParamList = {
  Home: undefined;
  Details: {
    productId?: string | undefined;
  };
  AddProduct: undefined
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
