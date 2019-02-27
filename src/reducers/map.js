import {
  ZOOM_TO_ISOCHRONES,
  ZOOM_TO_POINT,
  TOGGLE_ISOCHRONES,
  DOWNLOAD_ISOCHRONES
} from '../actions/map'

const initialState = {
  event: null,
  controlIdx: null,
  receivedAt: null,
  latLng: null
}

const mapEvents = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case ZOOM_TO_ISOCHRONES:
      return {
        ...state,
        event: action.type,
        controlIndex: action.controlIndex,
        receivedAt: action.receivedAt
      }
    case TOGGLE_ISOCHRONES:
      return {
        ...state,
        event: action.type,
        controlIndex: action.controlIndex,
        receivedAt: action.receivedAt
      }
    case DOWNLOAD_ISOCHRONES:
      return {
        ...state,
        event: action.type,
        controlIndex: action.controlIndex,
        receivedAt: action.receivedAt
      }
    case ZOOM_TO_POINT:
      return {
        ...state,
        event: action.type,
        latLng: action.latLng,
        receivedAt: action.receivedAt
      }
    default:
      return state
  }
}

export default mapEvents
