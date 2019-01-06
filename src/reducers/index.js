import { combineReducers } from "redux";
import {
  REQUEST_GEOCODE_RESULTS,
  RECEIVE_GEOCODE_RESULTS,
  ADD_ISOCHRONESCONTROL,
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
            ? { ...control, isFetching: false, geocodeResults: action.results }
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

// const userTextInput = (state = "", action) => {
//   console.log(state);
//   switch (action.type) {
//     case SET_USERTEXTINPUT:
//       return action.textInput;
//     default:
//       return state;
//   }
// };

// const geocodeResults = (
//   state = {
//     isFetching: false,
//     items: []
//   },
//   action
// ) => {
//   switch (action.type) {
//     // case REQUEST_GEOCODE_RESULTS:
//     //   return {
//     //     ...state,
//     //     isFetching: true
//     //   };
//     case RECEIVE_GEOCODE_RESULTS:
//       return {
//         ...state,
//         isFetching: false,
//         items: action.results,
//         lastUpdated: action.receivedAt
//       };
//     default:
//       return state;
//   }
// };

// const geocodeResultsByUserTextInput = (state = {}, action) => {
//   switch (action.type) {
//     case RECEIVE_GEOCODE_RESULTS:
//     case REQUEST_GEOCODE_RESULTS:
//       return {
//         ...state,
//         lastResults: geocodeResults(state[action.textInput], action)
//       };
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  //geocodeResultsByUserTextInput,
  //userTextInput,
  isochronesControls
});

export default rootReducer;
