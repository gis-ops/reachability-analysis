import { combineReducers } from "redux";
import {
  REQUEST_GEOCODE_RESULTS,
  RECEIVE_GEOCODE_RESULTS,
  RECEIVE_REVERSE_GEOCODE_RESULTS,
  ADD_ISOCHRONESCONTROL,
  REMOVE_ISOCHRONES_CONTROL,
  UPDATE_TEXTINPUT,
  UPDATE_SELECTED_ADDRESS
} from "../actions/actions";

const initialIsochronesControlsState = {
  controls: [{ userInput: "", geocodeResults: [], isFetching: false }]
};

const isochronesControls = (state = initialIsochronesControlsState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_ISOCHRONESCONTROL:
      return {
        ...state,
        controls: [...state.controls, action.payload]
      };
    case REMOVE_ISOCHRONES_CONTROL:
      return {
        ...state,
        controls: state.controls.filter((item, i) => i !== action.payload.controlIndex)
      };
    case UPDATE_TEXTINPUT:
      return {
        ...state,
        controls: state.controls.map((control, i) =>
          i === action.payload.controlIndex
            ? { ...control, userInput: action.payload.inputValue }
            : control
        )
      };
    case REQUEST_GEOCODE_RESULTS:
      return {
        ...state,
        controls: state.controls.map((control, i) =>
          i === action.controlIndex ? { ...control, isFetching: true } : control
        )
      };
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
      };
    case RECEIVE_REVERSE_GEOCODE_RESULTS:
      console.info("here", action);
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
      };
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
      };

    default:
      return state;
  }
};


const rootReducer = combineReducers({
  isochronesControls
});

export default rootReducer;
