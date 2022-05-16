import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  startOfDay,
  dateWithSec,
} from '../../utils/dateHelpers';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import icons from '../../constants/icons';
import Header from '../../components/Header';
import FlightItem from '../../components/FlightItem';
import {useSelector, useDispatch} from 'react-redux';
import Subtitle from '../../components/Subtitle';
import Calendar from '../../components/Calendar/Calendar';
import * as flightsActions from '../../stores/actions/flights';
const FlightImportScreen = ({navigation, route}) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateForFiltering, setDateForFiltering] = useState(startOfDay);
  const [isVisibleCalendar, toggleCalendar] = useState(false);
  const [isActiveCalendar, setActiveCalendar] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const textInputRef = React.useRef();
  const flights = useSelector(state => {
    const loadFlight = [];
    if (searchText === '') {
      return state.flights.flights;
    } else {
      state.flights.flights.forEach((element, index) => {
        if ((element.code + element.flightNo).includes(searchText)) {
          loadFlight.push(element);
        }
      });
      return loadFlight;
    }
  });
  const loadFlights = useCallback(
    async (code, number, date) => {
      setError(null);
      setIsRefreshing(true);
      /*   dispatch(loadingActions.start({ key: 'fetchFlight' })) */
      try {
        await dispatch(flightsActions.fetchFlights(code, number, date));
      } catch (err) {
        setError(err.message);
      } finally {
        /*    dispatch(loadingActions.stop({ key: 'fetchFlight' })) */
      }
      setIsRefreshing(false);
    },
    [dispatch, setIsLoading, setError],
  );
  const setActive = item => {
    setActiveCalendar(false);
    item(true);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFlights('', '', dateWithSec(dateForFiltering));
      //loadFavouriteFlights();
    });

    return () => {
      unsubscribe();
    };
  }, [loadFlights]);
  useEffect(() => {
    setIsLoading(true);

    const dateCheck = dateWithSec(dateForFiltering);
    loadFlights('', '', dateCheck).then(() => {
      setIsLoading(false);
      /*   loadFavouriteFlights().then(() => {
            setIsLoading(false);
          }); */
    });
  }, [dispatch, loadFlights, dateForFiltering]);
  const onToggleCalendar = () => {
    toggleCalendar(prev => !prev);
  };
  const onChangeCalendar = date => {
    if (!date.from && !date.to) return;
    setActive(setActiveCalendar);
    /*   if (!date.to) {
          if (isToday(date.from)) setActive(setActiveToday);
          else if (isYesterday(date.from) ) setActive(setActiveYesterday);
        } */
    setDateForFiltering(date.to ? date : date.from);
  };
  const onChangeTextHandle = text => {
    setSearchText(text);
  };
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
        title="Lịch Bay"
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
  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 45,
            flex: 1,
            //   marginTop:SIZES.padding,
            marginBottom: SIZES.base,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            // paddingTop:5
            //justifyContent:'center'
          }}>
          <Image
            source={icons.search}
            style={{height: 20, width: 20, tintColor: COLORS.black}}
          />
          <View
            style={{
              alignItems: 'center',
              //  backgroundColor:COLORS.yellow,
              marginBottom: -5,
            }}>
            <TextInput
              // onEndEditing={onSearchHandler}
              ref={textInputRef}
              style={{
                flex: 1,
                // backgroundColor:COLORS.white,
                ...FONTS.body3,
              }}
              placeholder="Search Flight...ex:EK9222     "
              value={searchText}
              onChangeText={text => onChangeTextHandle(text)}
            />
          </View>
        </View>
        {/* render Date Filter */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: SIZES.base,
            marginBottom: 10,
            // backgroundColor:COLORS.red
          }}>
          <Calendar
            isVisible={isVisibleCalendar}
            isActiveIcon={isActiveCalendar}
            onToggleCalendar={onToggleCalendar}
            onSelectedDate={onChangeCalendar}
            initialDate={dateForFiltering}
          />
        </View>
      </View>
    );
  }
  function renderFlights() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={COLORS.primaryALS} />
          </View>
        ) : (
          <FlatList
            numColumns={2}
            onRefresh={() => loadFlights('', '', dateWithSec(dateForFiltering))}
            refreshing={isRefreshing}
            data={flights}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.padding,
              marginBottom: 20,
              backgroundColor: COLORS.white,
            }}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    height: 15,
                  }}></View>
              );
            }}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={item => item.id}
            renderItem={itemData => (
              <FlightItem
                id={itemData.item.id}
                entity={itemData.item}
                //onToggleFavourite={toggleFavoriteHandler}
              />
            )}
          />
        )}
      </View>
    );
  }
  return (
    <View
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
      {renderSearch()}
      <Subtitle
        containerStyle={{
          marginHorizontal: SIZES.padding,
          paddingTop: SIZES.base,
          borderBottomColor: COLORS.lightGray1,
          borderBottomWidth: 1,
        }}
        leftText=""
        date={dateForFiltering}
        withoutPadding
      />
      {/*   {searchText === '' && renderSuggesstion()} */}
      {renderFlights()}
    </View>
  );
};
export default FlightImportScreen;
