import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import icons from '../../constants/icons';
import {COLORS, SIZES} from '../../constants/theme';
import {WebView} from 'react-native-webview';
import Header from '../../components/Header';
const NewsScreen = ({navigation, route}) => {
  const {url, title} = route.params;

  const runFirst = `
    setTimeout(function() { 
        var child = document.getElementsByTagName("header");
        child[0].remove();
        const elment = document.getElementsByClassName('parallax-wrapper')
        if(elment){
            elment[0].remove();
        }s
      }, 10);
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  const runBeforeFirst = `
    window.isNativeApp = true;
    true; // note: this is required, or you'll sometimes get silent failures
`;
  function renderHeader() {
    return (
      <Header
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{
          height: 60,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
          backgroundColor: COLORS.primaryALS,
          marginTop: Platform.OS == 'ios' ? 30 : 0,
        }}
        title={title}
        leftComponent={
          <TouchableOpacity
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 35,
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
              borderWidth: 1,
              borderColor: COLORS.gray2,
            }}
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 25,
                height: 25,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        }

        /*  rightComponent={<CartQuantityButton quantity={cartLagiQuantity} onPress={()=>navigation.navigate("CartLagi")} />} */
      />
    );
  }
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: Platform.OS === 'ios' ? 90 : 60,
          backgroundColor: COLORS.white,
        }}
      />
      <WebView
        source={{uri: url}}
        javaScriptEnabled={true}
        scrollEnabled={true}
        startInLoadingState={true}
        domStorageEnabled={true}
        //injectedJavaScript={runFirst}
        //injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
        //renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
        // containerStyle={{
        //  alignItems:'center'
        // }}
      />
    </View>
  );
};

export default NewsScreen;
