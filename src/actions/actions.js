import { hereConfig } from "../hereConfig";

export const REQUEST_GEOCODE_RESULTS = "REQUEST_GEOCODE_RESULTS";
export const RECEIVE_GEOCODE_RESULTS = "RECEIVE_GEOCODE_RESULTS";
export const RECEIVE_REVERSE_GEOCODE_RESULTS =
  "RECEIVE_REVERSE_GEOCODE_RESULTS";
export const SET_USERTEXTINPUT = "SET_USERTEXTINPUT";
export const ADD_ISOCHRONESCONTROL = "ADD_ISOCHRONESCONTROL";
export const UPDATE_TEXTINPUT = "UPDATE_TEXTINPUT";
export const UPDATE_SELECTED_ADDRESS = "UPDATE_SELECTED_ADDRESS";
export const REMOVE_ISOCHRONES_CONTROL = "REMOVE_ISOCHRONES_CONTROL";

const parseResponse = (json, latLng) => {
  if (json.Response && json.Response.View.length > 0) {
    let processedResults = [];

    for (const address of json.Response.View[0].Result) {
      console.log(address);

      if (address.Location && address.Location.LocationType === "point") {
        processedResults.push({
          title: address.Location.Address.Label,
          description: address.Location.Address.PostalCode,
          DisplayPosition: {
            lat: latLng
              ? latLng.lat
              : address.Location.DisplayPosition.Latitude,
            lng: latLng
              ? latLng.lng
              : address.Location.DisplayPosition.Longitude
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
  receivedAt: Date.now(),
  reverse: false
});

const receiveReverseGeocodeResults = (
  controlIndex,
  json,
  latLng,
  preFetch = false
) => ({
  type: RECEIVE_REVERSE_GEOCODE_RESULTS,
  controlIndex,
  results: preFetch
    ? [
        {
          title: [json.lat, json.lng].join(","),
          description: "",
          DisplayPosition: {
            lat: json.lat,
            lng: json.lng
          },
          selected: true
        }
      ]
    : parseResponse(json, latLng),
  receivedAt: Date.now(),
  reverse: true
});

const setReverseGeocodeResult = (controlIndex, action) => dispatch => {
  console.log(action);

  dispatch(
    updateTextInput({
      controlIndex: controlIndex,
      inputValue: action.results[0].title
    })
  );

  dispatch(
    updateSelectedAddress({
      controlIndex: controlIndex,
      inputValue: action.results[0].title
    })
  );
};

export const fetchHereGeocode = payload => dispatch => {
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

export const fetchHereReverseGeocode = payload => dispatch => {
  // fake response
  dispatch(
    receiveReverseGeocodeResults(
      payload.isoIndex,
      { lat: payload.lat, lng: payload.lng },
      true
    )
  );

  dispatch(requestGeocodeResults(payload.isoIndex));

  const radius = 250;

  let url = new URL(
      "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json"
    ),
    params = {
      app_id: hereConfig.appId,
      app_code: hereConfig.appCode,
      mode: "retrieveAddresses",
      maxresults: 1,
      prox: [payload.lat, payload.lng, radius].join(",")
    };

  url.search = new URLSearchParams(params);

  return fetch(url)
    .then(response => response.json())
    .then(json =>
      dispatch(
        receiveReverseGeocodeResults(payload.isoIndex, json, {
          lat: payload.lat,
          lng: payload.lng
        })
      )
    )
    .then(action =>
      dispatch(setReverseGeocodeResult(payload.isoIndex, action))
    );
};

export const requestGeocodeResults = controlIndex => ({
  type: REQUEST_GEOCODE_RESULTS,
  controlIndex
});

export const addIsochronesControl = () => ({
  type: ADD_ISOCHRONESCONTROL,
  payload: { userInput: "", geocodeResults: [], isFetching: false }
});

export const removeIsochronesControl = controlIndex => ({
  type: REMOVE_ISOCHRONES_CONTROL,
  payload: controlIndex
});

export const updateTextInput = textInputIndex => ({
  type: UPDATE_TEXTINPUT,
  payload: textInputIndex
});

export const updateSelectedAddress = textInputIndex => ({
  type: UPDATE_SELECTED_ADDRESS,
  payload: textInputIndex
});
