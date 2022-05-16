import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainNavigator from '../MainNavigator/MainNavigator';
import SearchNavigator from '../SearchNavigator/SearchNavigator';
import NewsScreen from '../../screens/News/NewsScreen';
import FlightImportScreen from '../../screens/FlightImport/FlightImportScreen';
const Stack = createNativeStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="SearchNav" component={SearchNavigator} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="FlightImport" component={FlightImportScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
