export default class SettingsObject {
  constructor() {
    this.userInput = ''
    this.geocodeResults = []
    this.isochrones = {
      receivedAt: null,
      results: []
    }
    this.isochronesHidden = false
    this.isFetching = false
    this.isFetchingIsochrones = false
    this.settings = {
      range: {
        min: 1,
        max: 500,
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
      rangetype: 'distance',
      direction: 'start',
      traffic: 'disabled',
      timeEnabled: false,
      hgv: {
        height: 5,
        weight: 100,
        width: 5,
        length: 20,
        weightPerAxle: 50,
        trailersCount: 0,
        shippedHazardousGoods: [],
        tunnelCategory: ''
      }
    }
  }
}
