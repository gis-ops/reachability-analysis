//import hereConfig from '../hereConfig'
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
const catchErrorGeocodeXMLResponse = (err, controlIndex) => dispatch => {
  const responseDoc = new DOMParser().parseFromString(err, 'application/xml')

  const error = responseDoc.getElementsByTagName('ns2:Error')
  const subtype = error[0].getAttribute('subtype')

  if (subtype == 'InvalidCredentials') {
    dispatch(
      resultHandler({
        handlerCode: 'INVALID_CREDENTIALS',
        handlerMessage: responseDoc.getElementsByTagName('Details')[0].innerHTML
      })
    )
  }

  dispatch(receiveGeocodeResults(controlIndex, []))
}

const catchErrorIsochronesJSONResponse = (err, controlIndex) => dispatch => {
  console.log(err.response)
  if (err.response.subtype == 'InvalidInputData') {
    dispatch(
      resultHandler({
        handlerCode: 'INVALID_CREDENTIALS',
        handlerMessage: err.response.details
      })
    )
  }

  dispatch(receiveIsochronesResults(controlIndex, []))
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
  let isolineParameters = {}

  if (settings.direction == 'start') {
    isolineParameters.start = center.lat + ',' + center.lng
    if (settings.timeEnabled) {
      if (settings.timeVal) isolineParameters['departure'] = settings.timeVal
    }
  } else if (settings.direction == 'destination') {
    isolineParameters.destination = center.lat + ',' + center.lng
    if (settings.timeEnabled) {
      if (settings.timeVal) isolineParameters['arrival'] = settings.timeVal
    }
  }
  isolineParameters.mode =
    'fastest;' + settings.mode + ';' + 'traffic:' + settings.traffic + ';'
  isolineParameters.rangetype = settings.rangetype

  if (settings.mode == 'truck') {
    if (settings.enableHgvSettings) {
      isolineParameters = Object.assign(settings.hgv, isolineParameters)
      isolineParameters.shippedHazardousGoods = settings.hgv.shippedHazardousGoods.join(
        ','
      )
      isolineParameters.tunnelCategory = settings.hgv.tunnelCategory
    }
  }

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

const handleResponse = response => {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response)
  } else if (contentType.includes('application/xml;charset=utf-8')) {
    return handleXMLResponse(response)
  } else {
    // Other response types as necessary. I haven't found a need for them yet though.
    throw new Error(`Sorry, content-type ${contentType} not supported`)
  }
}

const handleJSONResponse = response => {
  return response.json().then(json => {
    if (response.ok) {
      return json
    } else {
      return Promise.reject(
        Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText,
          err: json
        })
      )
    }
  })
}
const handleXMLResponse = response => {
  return response.text().then(text => {
    if (response.ok) {
      return text
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        err: text
      })
    }
  })
}

export const fetchHereGeocode = payload => dispatch => {
  dispatch(requestGeocodeResults({ controlIndex: payload.controlIndex }))

  let url = new URL('https://geocoder.api.here.com/6.2/geocode.json'),
    params = {
      app_id: payload.hereConfig.appId,
      app_code: payload.hereConfig.appCode,
      searchtext: payload.inputValue
    }

  url.search = new URLSearchParams(params)

  return fetch(url)
    .then(handleResponse)
    .then(data => dispatch(processGeocodeResponse(data, payload.controlIndex)))
    .catch(error =>
      dispatch(catchErrorGeocodeXMLResponse(error.err, payload.controlIndex))
    )
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
      app_id: payload.hereConfig.appId,
      app_code: payload.hereConfig.appCode,
      ...isolineParameters
    }

  url.search = new URLSearchParams(params)

  return fetch(url)
    .then(handleResponse)
    .then(data =>
      dispatch(processIsochronesResponse(data, payload.controlIndex))
    )
    .catch(error =>
      dispatch(
        catchErrorIsochronesJSONResponse(error.err, payload.controlIndex)
      )
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
      app_id: payload.hereConfig.appId,
      app_code: payload.hereConfig.appCode,
      mode: 'retrieveAddresses',
      maxresults: 1,
      prox: [payload.lat, payload.lng, radius].join(',')
    }

  url.search = new URLSearchParams(params)

  return fetch(url)
    .then(handleResponse)
    .then(data =>
      dispatch(
        processGeocodeResponse(
          data,
          payload.isoIndex,
          {
            lat: payload.lat,
            lng: payload.lng
          },
          true
        )
      )
    )
    .catch(error =>
      dispatch(catchErrorGeocodeXMLResponse(error.err, payload.controlIndex))
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
  receivedAt: Date.now(),
  ...payload
})
