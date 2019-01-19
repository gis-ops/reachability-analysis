import { RESULT_HANDLER } from '../actions/actions'

const handlerMessage = {
  NO_GEOCODE_RESULTS:
    'Sorry, unfortunately no addresses can be found, please try a different location.',
  NO_ISOCHRONES_RESULTS:
    'Sorry, unfortunately no isochrones can be computed, please try a different location.'
}

const handlerTopic = {
  NO_GEOCODE_RESULTS: 'Unable to find addresses here',
  NO_ISOCHRONES_RESULTS: 'Unable to build isochrones here',
  INVALID_CREDENTIALS:
    'Sorry, your credentials seem to be invalid, please check again.'
}

const initialState = {
  handlerCode: null,
  handlerMessage: null,
  handlerTopic: null,
  receivedAt: null
}

const resultHandler = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case RESULT_HANDLER:
      return {
        ...state,
        handlerCode: action.handlerCode,
        handlerTopic: handlerTopic[action.handlerCode],
        handlerMessage: action.handlerMessage
          ? action.handlerMessage
          : handlerMessage[action.handlerCode],
        receivedAt: action.receivedAt
      }
    default:
      return state
  }
}

export default resultHandler
