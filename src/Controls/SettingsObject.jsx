export default class SettingsObject {
  constructor() {
    this.userInput = ''
    this.geocodeResults = []
    this.isochrones = {
      receivedAt: null,
      results: []
    }
    this.isFetching = false
    this.isFetchingIsochrones = false
    this.settings = {
      range: {
        min: 1,
        max: 600,
        step: 1,
        value: 60
      },
      interval: {
        min: 1,
        max: 60,
        step: 1,
        value: 10
      },
      mode: 'car',
      rangetype: 'distance'
    }
  }
}
