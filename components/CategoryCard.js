import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants/theme';
import Text from '../constants/Text';
import dummyData from '../constants/dummyData';
import {SharedElement} from 'react-navigation-shared-element';
const CategoryCard = ({
  sharedElementPrefix,
  category,
  containerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        //height:150,
        width: 200,
        ...containerStyle,
      }}
      onPress={onPress}>
      <ImageBackground
        source={category?.thumbnail}
        resizeMode="cover"
        style={{
          height: 150,
          width: 200,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          justifyContent: 'flex-end',
          ...containerStyle,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}>
        {/* <Text
                    style={{
                        color:COLORS.white,
                        ...FONTS.h2
                    }}
                >{category?.title}</Text> */}
      </ImageBackground>
      <View>
        {/* Title */}
        <Text
          h2
          darkGray
          style={{
            fontSize: 18,
            marginLeft: SIZES.base,
            marginTop: SIZES.base,
          }}>
          {category?.title}
        </Text>
        {/* Detail */}
        <Text
          body3
          gray
          style={{
            marginLeft: SIZES.base,
            //marginTop:SIZES.base
          }}>
          {category?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default CategoryCard;
