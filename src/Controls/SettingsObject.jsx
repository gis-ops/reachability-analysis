export default class SettingsObject {
  constructor() {
    this.userInput = ''
    this.geocodeResults = []
    this.isFetching = false
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
      mode: 'car'
    }
  }
}
