import { hereConfig } from '../hereConfig'
import SettingsObject from '../Controls/SettingsObject'
import { zoomToIsochrones } from './map'

export const REQUEST_GEOCODE_RESULTS = 'REQUEST_GEOCODE_RESULTS'
export const REQUEST_ISOCHRONES_RESULTS = 'REQUEST_ISOCHRONES_RESULTS'
export const RECEIVE_GEOCODE_RESULTS = 'RECEIVE_GEOCODE_RESULTS'
export const RECEIVE_REVERSE_GEOCODE_RESULTS = 'RECEIVE_REVERSE_GEOCODE_RESULTS'
export const SET_USERTEXTINPUT = 'SET_USERTEXTINPUT'
export const ADD_ISOCHRONESCONTROL = 'ADD_ISOCHRONESCONTROL'
export const UPDATE_TEXTINPUT = 'UPDATE_TEXTINPUT'
export const UPDATE_SELECTED_ADDRESS = 'UPDATE_SELECTED_ADDRESS'
export const REMOVE_ISOCHRONES_CONTROL = 'REMOVE_ISOCHRONES_CONTROL'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
export const RECEIVE_ISOCHRONES_RESULTS = 'RECEIVE_ISOCHRONES_RESULTS'
export const RESULT_HANDLER = 'RESULT_HANDLER'

const parseGeocodeResponse = (json, latLng) => {
  if (json.Response && json.Response.View.length > 0) {
    let processedResults = []

    for (const address of json.Response.View[0].Result) {
      if (address.Location && address.Location.LocationType === 'point') {
        processedResults.push({
          title: address.Location.Address.Label,
          description: address.Location.Address.PostalCode,
          displayposition: {
            lat: latLng
              ? latLng.lat
              : address.Location.DisplayPosition.Latitude,
            lng: latLng
              ? latLng.lng
              : address.Location.DisplayPosition.Longitude
          },
          selected: false
        })
      }
    }
    return processedResults
  }

  // if not addresses are found return without coordinates
  return [
    {
      title: '',
      description: '',
      displayposition: {
        lat: latLng.lat,
        lng: latLng.lng
      },
      selected: false
    }
  ]
}

const parseIsochronesResponse = json => {
  if (json.response && json.response.isoline.length > 0) {
    const isolinesReversed = json.response.isoline.reverse()
    return isolinesReversed
  }
  return []
}

const processIsochronesResponse = (json, controlIndex) => dispatch => {
  const results = parseIsochronesResponse(json)

  if (results.length == 0) {
    dispatch(
      resultHandler({
        handlerCode: 'NO_ISOCHRONES_RESULTS'
      })
    )
  }
  dispatch(receiveIsochronesResults(controlIndex, results))
  if (results.length > 0) dispatch(zoomToIsochrones(controlIndex))
}

const processGeocodeResponse = (
  json,
  controlIndex,
  latLng = false,
  reverse = false
) => dispatch => {
  const results = parseGeocodeResponse(json, latLng)

  // if no address can be found
  if (results[0].title.length == 0) {
    dispatch(
      resultHandler({
        handlerCode: 'NO_GEOCODE_RESULTS'
      })
    )
  }
  dispatch(receiveGeocodeResults(controlIndex, results, reverse))
  if (reverse) dispatch(setReverseGeocodeResult(controlIndex, results))
}

export const receiveGeocodeResults = (controlIndex, results, reverse) => ({
  type: RECEIVE_GEOCODE_RESULTS,
  controlIndex,
  results: results,
  receivedAt: Date.now(),
  reverse: reverse
})

export const receiveIsochronesResults = (controlIndex, results) => ({
  type: RECEIVE_ISOCHRONES_RESULTS,
  controlIndex,
  results: results,
  receivedAt: Date.now(),
  reverse: false
})

const setReverseGeocodeResult = (controlIndex, results) => dispatch => {
  if (results[0]) {
    dispatch(
      updateTextInput({
        controlIndex: controlIndex,
        inputValue: results[0] ? results[0].title : ''
      })
    )

    dispatch(
      updateSelectedAddress({
        controlIndex: controlIndex,
        inputValue: results[0] ? results[0].title : ''
      })
    )
    //dispatch(zoomToPoint(action.results[0].displayposition))
  }
}

const processIsolineSettings = (settings, center) => {
  const isolineParameters = {}

  isolineParameters.start = center.lat + ',' + center.lng
  isolineParameters.mode = 'fastest;' + settings.mode
  isolineParameters.rangetype = settings.rangetype

  // seconds
  const ranges = []
  if (settings.rangetype === 'time') {
    let rangeInSeconds = settings.range.value * 60
    const intervalInSeconds = settings.interval.value * 60

    // 600/100
    while (rangeInSeconds > 0) {
      ranges.push(rangeInSeconds)
      rangeInSeconds -= intervalInSeconds
    }

    isolineParameters.range = ranges.join(',')

    // meters
  } else if (settings.rangetype === 'distance') {
    let rangeInMeters = settings.range.value * 1000
    const intervalInMeters = settings.interval.value * 1000

    // 600/100
    while (rangeInMeters > 0) {
      ranges.push(rangeInMeters)
      rangeInMeters -= intervalInMeters
    }

    isolineParameters.range = ranges.join(',')
  }
  return isolineParameters
}

export const fetchHereGeocode = payload => dispatch => {
  dispatch(requestGeocodeResults({ controlIndex: payload.controlIndex }))

  let url = new URL('https://geocoder.api.here.com/6.2/geocode.json'),
    params = {
      app_id: hereConfig.appId,
      app_code: hereConfig.appCode,
      searchtext: payload.inputValue
    }

  url.search = new URLSearchParams(params)

  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(processGeocodeResponse(json, payload.controlIndex)))
}

export const fetchHereIsochrones = payload => dispatch => {
  dispatch(requestIsochronesResults(payload.controlIndex))

  const isolineParameters = processIsolineSettings(
    payload.settings,
    payload.center
  )

  let url = new URL(
      'https://isoline.route.api.here.com/routing/7.2/calculateisoline.json'
    ),
    params = {
      app_id: hereConfig.appId,
      app_code: hereConfig.appCode,
      ...isolineParameters
    }

  url.search = new URLSearchParams(params)

  return fetch(url)
    .then(response => response.json())
    .then(json =>
      dispatch(processIsochronesResponse(json, payload.controlIndex))
    )
}

export const fetchHereReverseGeocode = payload => dispatch => {
  dispatch(
    requestGeocodeResults({ controlIndex: payload.isoIndex, reverse: true })
  )

  const radius = 250

  let url = new URL(
      'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json'
    ),
    params = {
      app_id: hereConfig.appId,
      app_code: hereConfig.appCode,
      mode: 'retrieveAddresses',
      maxresults: 1,
      prox: [payload.lat, payload.lng, radius].join(',')
    }

  url.search = new URLSearchParams(params)

  return fetch(url)
    .then(response => response.json())
    .then(json =>
      dispatch(
        processGeocodeResponse(
          json,
          payload.isoIndex,
          {
            lat: payload.lat,
            lng: payload.lng
          },
          true
        )
      )
    )
}

export const requestIsochronesResults = controlIndex => ({
  type: REQUEST_ISOCHRONES_RESULTS,
  controlIndex
})

export const requestGeocodeResults = payload => ({
  type: REQUEST_GEOCODE_RESULTS,
  ...payload
})

export const addIsochronesControl = () => ({
  type: ADD_ISOCHRONESCONTROL,
  payload: new SettingsObject()
})

export const removeIsochronesControl = controlIndex => ({
  type: REMOVE_ISOCHRONES_CONTROL,
  payload: controlIndex
})

export const updateTextInput = textInputIndex => ({
  type: UPDATE_TEXTINPUT,
  payload: textInputIndex
})

export const updateSelectedAddress = textInputIndex => ({
  type: UPDATE_SELECTED_ADDRESS,
  payload: textInputIndex
})

export const updateSettings = payload => ({
  type: UPDATE_SETTINGS,
  payload: payload
})

export const resultHandler = payload => ({
  type: RESULT_HANDLER,
  handlerCode: payload.handlerCode,
  receivedAt: Date.now()
})
