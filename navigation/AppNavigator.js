import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './HomeNavigator/HomeNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
