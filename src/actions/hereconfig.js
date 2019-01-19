export const SET_APP_ID = 'SET_APP_ID'
export const SET_APP_CODE = 'SET_APP_CODE'

export const setAppId = appId => ({
  type: SET_APP_ID,
  receivedAt: Date.now(),
  appId
})

export const setAppCode = appCode => ({
  type: SET_APP_CODE,
  receivedAt: Date.now(),
  appCode
})
