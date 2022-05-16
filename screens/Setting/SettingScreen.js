import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import base64 from 'base-64';
import CalendarPicker from 'react-native-calendar-picker';
const SettingScreen = () => {
  const uname = 'cluster';
  const pword = 'cluster';
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [truckList, setTruckList] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  let username = 'cluster';
  let password = 'cluster';

  let headers = new Headers();
  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };

  const getDataList = async function () {
    if (loading) return;
    setLoading(true);
    setIsRefreshing(true);
    fetch(
      'http://10.0.3.2:8080/kettle/executeTrans/?trans=C:/AOMS/Jobs/api/api-aoms-wrong-booking-date-data.ktr&FROM_DATE=01-04-2022&TO_DATE=30-04-2022',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + base64.encode(username + ':' + password),
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        let dataListTmp = [];
        responseJson.data.forEach((item, index) => {
          //let createdStr = item?.Created || '';
          dataListTmp.push({
            id: index,
            Pieces: item?.PCS || 0,
            Price: item.PHIXULY,
            Date: item?.NGAYCHAPNHAN,
            Mawb: item?.LABS_MAWB_PREFIX + item?.LABS_MAWB_SERIAL_NO,
          });
        });
        Alert.alert(dataListTmp[0].Mawb + ' and ' + dataListTmp[1].Mawb);
      })
      .catch(error => {
        Alert.alert('Lỗi!', error.message);
      })
      .finally(function () {
        setLoading(false);
        setIsRefreshing(false);
      });
  };
  useEffect(() => {
    // getDataList().then(() => null);
  }, []);

  return (
    <View>
      <Text style={{}}>Setting Screens</Text>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={new Date(2018, 1, 1)}
        maxDate={new Date(2050, 6, 3)}
        weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
        months={[
          'January',
          'Febraury',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]}
        previousTitle="Previous"
        nextTitle="Next"
        todayBackgroundColor="#e6ffe6"
        selectedDayColor="#66ff33"
        selectedDayTextColor="#000000"
        scaleFactor={375}
        textStyle={{
          fontFamily: 'Cochin',
          color: '#000000',
        }}
        onDateChange={onDateChange}
      />
      <View style={styles.textStyle}>
        <Text style={styles.textStyle}>Selected Start Date :</Text>
        <Text style={styles.textStyle}>
          {selectedStartDate ? selectedStartDate.toString() : ''}
        </Text>
        <Text style={styles.textStyle}>Selected End Date :</Text>
        <Text style={styles.textStyle}>
          {selectedEndDate ? selectedEndDate.toString() : ''}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
});
export default SettingScreen;
