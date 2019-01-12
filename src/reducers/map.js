import { ZOOM_TO_ISOCHRONES } from '../actions/map'

const initialState = {
  event: null,
  controlIdx: null,
  receivedAt: null
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
    default:
      return state
  }
}

export default mapEvents
