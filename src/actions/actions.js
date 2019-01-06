import { hereConfig } from "../hereConfig";

export const REQUEST_GEOCODE_RESULTS = "REQUEST_GEOCODE_RESULTS";
export const RECEIVE_GEOCODE_RESULTS = "RECEIVE_GEOCODE_RESULTS";
export const SET_USERTEXTINPUT = "SET_USERTEXTINPUT";
export const ADD_ISOCHRONESCONTROL = "ADD_ISOCHRONESCONTROL";
export const UPDATE_TEXTINPUT = "UPDATE_TEXTINPUT";
export const UPDATE_SELECTED_ADDRESS = "UPDATE_SELECTED_ADDRESS";
export const UPDATE_POSITION = "UPDATE_POSITION";
// export const setUserTextInput = textInputIndex => ({
//   type: SET_USERTEXTINPUT,
//   textInputIndex
// });

const parseResponse = json => {
  if (json.Response && json.Response.View.length > 0) {
    let processedResults = [];

    for (const address of json.Response.View[0].Result) {
      console.log(address);

      if (address.Location && address.Location.LocationType === "point") {
        processedResults.push({
          title: address.Location.Address.Label,
          description: address.Location.Address.PostalCode,
          DisplayPosition: {
            lat: address.Location.DisplayPosition.Latitude,
            lng: address.Location.DisplayPosition.Longitude
          },
          selected: false
        });
      }
    }

    console.log(processedResults);
    return processedResults;
  }

  return [];
};

export const receiveGeocodeResults = (controlIndex, json) => ({
  type: RECEIVE_GEOCODE_RESULTS,
  controlIndex,
  results: parseResponse(json),
  receivedAt: Date.now()
});

export const fetchHereGeocode = payload => dispatch => {
  console.info(payload);
  dispatch(requestGeocodeResults(payload.controlIndex));

  let url = new URL("https://geocoder.api.here.com/6.2/geocode.json"),
    params = {
      app_id: hereConfig.appId,
      app_code: hereConfig.appCode,
      searchtext: payload.inputValue
    };

  url.search = new URLSearchParams(params);

  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveGeocodeResults(payload.controlIndex, json)));
};

export const requestGeocodeResults = controlIndex => ({
  type: REQUEST_GEOCODE_RESULTS,
  controlIndex
});

export const addIsochronesControl = () => ({
  type: ADD_ISOCHRONESCONTROL,
  payload: { userInput: "", geocodeResults: [], isFetching: false }
});

export const updateTextInput = textInputIndex => ({
  type: UPDATE_TEXTINPUT,
  payload: textInputIndex
});

export const updateSelectedAddress = textInputIndex => ({
  type: UPDATE_SELECTED_ADDRESS,
  payload: textInputIndex
});


export const updatePosition = payload => ({
  type: UPDATE_POSITION,
  payload: payload
});


