import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import s from './styles';
import {COLORS} from '../../constants/theme';
import {back30days} from '../../utils/dateHelpers';
import icons from '../../constants/icons';
import * as dimensions from '../../constants/dimensions';
const Calendar = ({
  isVisible,
  isActiveIcon,
  onToggleCalendar,
  onSelectedDate,
  initialDate,
}) => {
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(null);

  const onSelectDate = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };
  const onDonePress = () => {
    onToggleCalendar();

    onSelectedDate({
      from: startDate.startOf('day'),
      to: endDate ? endDate.endOf('day') : null,
    });
  };
  return (
    <View>
      <View /* style={s.calendarIcon} */>
        <TouchableOpacity onPress={onToggleCalendar}>
          <Image
            source={icons.calendar}
            style={{
              tintColor: isActiveIcon ? COLORS.green : COLORS.gray,
              width: dimensions.iconSize,
              height: dimensions.iconSize,
            }}
            // tintColor={isActiveIcon ? COLORS.green : COLORS.gray}
          />
        </TouchableOpacity>
      </View>

      <Modal
        style={s.modal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={isVisible}
        transparent={false}
        onBackdropPress={onToggleCalendar}
        backdropOpacity={0.1}>
        <View style={s.container}>
          <CalendarPicker
            startFromMonday
            allowRangeSelection
            minDate={back30days}
            //  maxDate={new Date()}
            selectedDayColor={COLORS.green}
            selectedDayTextColor={COLORS.white}
            onDateChange={onSelectDate}
            textStyle={s.textStyle}
          />
          <View style={s.buttonsContainer}>
            <TouchableOpacity borderless onPress={onToggleCalendar}>
              <Text style={[s.textStyle, s.cancelButtonText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity borderless onPress={onDonePress}>
              <Text style={[s.textStyle, s.doneButtonText]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Calendar;
