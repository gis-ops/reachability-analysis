import { combineReducers } from 'redux'
import {
  REQUEST_GEOCODE_RESULTS,
  REQUEST_ISOCHRONES_RESULTS,
  RECEIVE_GEOCODE_RESULTS,
  RECEIVE_REVERSE_GEOCODE_RESULTS,
  RECEIVE_ISOCHRONES_RESULTS,
  ADD_ISOCHRONESCONTROL,
  REMOVE_ISOCHRONES_CONTROL,
  UPDATE_TEXTINPUT,
  UPDATE_SELECTED_ADDRESS,
  UPDATE_SETTINGS
} from '../actions/actions'

import mapEvents from './map'

import SettingsObject from '../Controls/SettingsObject'

const initialIsochronesControlsState = {
  controls: [new SettingsObject()]
}

const isochronesControls = (state = initialIsochronesControlsState, action) => {
  console.log(action)
  switch (action.type) {
    case ADD_ISOCHRONESCONTROL:
      return {
        ...state,
        controls: [...state.controls, action.payload]
      }
    case REMOVE_ISOCHRONES_CONTROL:
      return {
        ...state,
        controls: state.controls.filter(
          (item, i) => i !== action.payload.controlIndex
        )
      }
    case UPDATE_TEXTINPUT:
      return {
        ...state,
        controls: state.controls.map((control, i) =>
          i === action.payload.controlIndex
            ? { ...control, userInput: action.payload.inputValue }
            : control
        )
      }
    case REQUEST_ISOCHRONES_RESULTS:
      return {
        ...state,
        controls: state.controls.map((control, i) =>
          i === action.controlIndex
            ? { ...control, isFetchingIsochrones: true }
            : control
        )
      }
    case REQUEST_GEOCODE_RESULTS:
      return {
        ...state,
        controls: state.controls.map((control, i) =>
          i === action.controlIndex ? { ...control, isFetching: true } : control
        )
      }
    case RECEIVE_GEOCODE_RESULTS:
      return {
        ...state,
        controls: state.controls.map((control, i) =>
          i === action.controlIndex
            ? {
                ...control,
                isFetching: false,
                geocodeResults: action.results,
                reverse: action.reverse
              }
            : control
        )
      }
    case RECEIVE_REVERSE_GEOCODE_RESULTS:
      return {
        ...state,
        controls: state.controls.map((control, i) =>
          i === action.controlIndex
            ? {
                ...control,
                isFetching: false,
                geocodeResults: action.results,
                reverse: action.reverse
              }
            : control
        )
      }
    case UPDATE_SELECTED_ADDRESS:
      return {
        ...state,
        controls: state.controls.map((control, i) =>
          i === action.payload.controlIndex
            ? {
                ...control,
                geocodeResults: control.geocodeResults.map(result =>
                  result.title === action.payload.inputValue
                    ? { ...result, selected: true }
                    : { ...result, selected: false }
                )
              }
            : control
        )
      }
    case UPDATE_SETTINGS:
      return {
        ...state,
        controls: state.controls.map((control, i) =>
          i === action.controlIndex
            ? {
                ...control,
                settings: action.payload.settings
              }
            : control
        )
      }
    case RECEIVE_ISOCHRONES_RESULTS:
      return {
        ...state,
        controls: state.controls.map((control, i) =>
          i === action.controlIndex
            ? {
                ...control,
                isFetchingIsochrones: false,
                isochrones: {
                  results: action.results,
                  receivedAt: action.receivedAt
                }
              }
            : control
        )
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  isochronesControls,
  mapEvents
})

export default rootReducer
