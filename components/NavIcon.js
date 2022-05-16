import React from 'react';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import * as dimensions from '../constants/dimensions';
FontAwesome.loadFont()
const NavIcon = ({tintColor, ...props}) => (
  <FontAwesome
    size={dimensions.iconSize}
    style={{color: tintColor}}
    {...props}
  />
);

export default NavIcon;