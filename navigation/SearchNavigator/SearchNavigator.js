import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../../screens/Search/SearchScreen';
import TracingScreen from '../../screens/Search/Tracing/TracingScreen';
import AwbDetailScreen from '../../screens/Search/AwbDetail/AwbDetailScreen';
const Stack = createNativeStackNavigator();
const SearchNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="AwbDetail" component={AwbDetailScreen} />
      <Stack.Screen name="Tracing" component={TracingScreen} />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
