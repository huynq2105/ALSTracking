import Flight from '../../models/Flight';
export const SET_FLIGHT = 'SET_FLIGHT';
export const TOGGLE_FAVOURITE_FLIGHT = 'TOGGLE_FAVOURITE_FLIGHT';
export const SET_FAVOURITE_FLIGHT = 'SET_FAVOURITE_FLIGHT';

export const fetchFlights = (code, number, date) => {
  return async dispatch => {
    try {
      const response = await fetch(
        'http://tracuu.alsc.com.vn/api/FlightImpApi?page=1&pageSize=20&code=' +
          code +
          '&flightNo=' +
          number +
          '&fda=' +
          date +
          '&tda=' +
          date,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const resData = await response.json();
      const loadedFilterFlights = [];
      resData.Flights.forEach((item, index) => {
        return loadedFilterFlights.push(
          new Flight(
            item.FlightID,
            item.Code,
            item.FlightNo,
            item.ScheDate,
            item.ScheTime,
            item.LandDate,
            item.LandTime,
            item.FlightType,
          ),
        );
      });
      dispatch({
        type: SET_FLIGHT,
        flights: loadedFilterFlights,
      });
    } catch (err) {}
  };
};
