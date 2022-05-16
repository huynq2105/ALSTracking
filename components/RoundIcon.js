import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import Text from '../constants/Text';
import * as dimensions from '../constants/dimensions';

const size = dimensions.iconSize + 40;
const RoundIcon = ({type, border, backgroundColor}) => {
  return (
    <View
      style={{...styles.circle, ...border, backgroundColor: backgroundColor}}>
      <Text white>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        paddingTop: 2,
      },
    }),
  },
});
export default RoundIcon;
