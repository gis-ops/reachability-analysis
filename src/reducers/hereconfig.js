import { SET_APP_ID, SET_APP_CODE } from '../actions/hereconfig'

const initialState = {
  appId: 'yATlKFDZwdLtjHzyTeCK',
  appCode: '0XXQyxbiCjVU7jN2URXuhg'
}

console.log(SET_APP_ID, SET_APP_CODE)

const hereConfig = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case SET_APP_ID:
      console.log(action.type, action)

      return {
        ...state,
        appId: action.appId,
        receivedAt: action.receivedAt
      }
    case SET_APP_CODE:
      return {
        ...state,
        appCode: action.appCode,
        receivedAt: action.receivedAt
      }
    default:
      return state
  }
}

export default hereConfig
