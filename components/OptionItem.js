import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/theme';
import icons from '../constants/icons';
import LinearGradient from 'react-native-linear-gradient';
const OptionItem = ({bgColor, icon, label, onPress, containerStyle}) => {
  return (
    <LinearGradient
    style={[{alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'red' }]}
    colors={bgColor}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
>
    <TouchableOpacity
      style={[
        //styles.shadow,
        {
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          ...containerStyle,
          borderWidth: 1,
          borderRadius: 10,
          //backgroundColor: COLORS.white,
          borderColor: COLORS.white,
        },
      ]}
      onPress={onPress}>
      <View style={{width: 40, height: 40}}>
        <Image
          source={icon}
          resizeMode="cover"
          style={{
            tintColor: COLORS.white,
            width: 30,
            height: 30,
          }}
        />
      </View>
      <Text style={{color: COLORS.white2, ...FONTS.body4}}>
        {label}
      </Text>
    </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default OptionItem;
