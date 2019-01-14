import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Slider } from 'react-semantic-ui-range'
import {
  Label,
  Input,
  Button,
  Divider,
  Accordion,
  Icon
} from 'semantic-ui-react'
import { updateSettings } from '../actions/actions'

const transportModes = {
  pedestrian: {
    type: ['fastest', 'shortest'],
    traffic: ['enabled', 'disabled']
  },
  car: {
    type: ['fastest', 'shortest', 'traffic'],
    traffic: ['enabled', 'disabled'],
    consumptionModel: ['default', 'standard'],
    customConsumptionDetails: {}
  },
  truck: {
    type: ['fastest'],
    shippedHazardousGoods: [],
    limitedWeight: {},
    weightPerAxle: {},
    height: {},
    width: {},
    length: {},
    tunnelCategory: [],
    consumptionModel: ['default', 'standard'],
    customConsumptionDetails: {}
  }
}

const rangeTypes = {
  distance: {},
  time: {}
}

class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0
    }
  }

  static propTypes = {
    userTextInput: PropTypes.string,
    results: PropTypes.array,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    controls: PropTypes.array.isRequired,
    controlindex: PropTypes.number.isRequired
  }

  updateSettings() {
    const { controls, controlindex, dispatch } = this.props

    dispatch(
      updateSettings({
        controlIndex: controlindex,
        settings: controls[controlindex].settings
      })
    )
  }

  handleClickAccordion = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleClickMode(mode) {
    const { controls, controlindex } = this.props

    controls[controlindex].settings.mode = mode

    this.updateSettings()
  }

  handleRangetype(rangetype) {
    const { controls, controlindex } = this.props

    controls[controlindex].settings.rangetype = rangetype

    this.updateSettings()
  }

  alignRangeInterval() {
    const { controls, controlindex } = this.props

    if (
      controls[controlindex].settings.range.value <
        controls[controlindex].settings.interval.value ||
      controls[controlindex].settings.interval.value == ''
    ) {
      controls[controlindex].settings.interval.value =
        controls[controlindex].settings.range.value
    }

    controls[controlindex].settings.interval.max =
      controls[controlindex].settings.range.value
  }

  handleRangeValueChange(e, { value }) {
    const { controls, controlindex } = this.props

    controls[controlindex].settings.range.value = value

    this.alignRangeInterval()
    this.updateSettings()
  }

  handleIntervalValueChange(e, { value }) {
    const { controls, controlindex } = this.props

    if (value <= controls[controlindex].settings.range.value) {
      controls[controlindex].settings.interval.value = value
      this.updateSettings()
    }
  }

  render() {
    const { controls, controlindex } = this.props

    const rangetype =
      controls[controlindex].settings.rangetype === 'time'
        ? ' minutes'
        : ' kilometers'

    const rangeSettings = {
      settings: {
        ...controls[controlindex].settings.range,
        start: controls[controlindex].settings.range.value,
        onChange: value => {
          controls[controlindex].settings.range.value = value

          this.alignRangeInterval()
          this.updateSettings()
        }
      }
    }

    const intervalSettings = {
      settings: {
        ...controls[controlindex].settings.interval,
        start: controls[controlindex].settings.interval.value,
        onChange: value => {
          controls[controlindex].settings.interval.value = value

          this.updateSettings()
        }
      }
    }

    return (
      <div>
        <Accordion>
          <Accordion.Title
            active={this.state.activeIndex === 1}
            index={1}
            onClick={this.handleClickAccordion}>
            <Icon name="dropdown" />
            <Label size="small" color="purple">
              {'Travel settings'}
            </Label>
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex === 1}>
            <div className="mt3">
              <Button.Group basic size="small">
                {transportModes &&
                  Object.keys(transportModes).map((key, i) => (
                    <Button
                      active={key === controls[controlindex].settings.mode}
                      key={i}
                      mode={key}
                      onClick={() => this.handleClickMode(key)}>
                      {key}
                    </Button>
                  ))}
              </Button.Group>
              {/*
                - Start/destination
                - HGV settings 
                (trailersCount, shippedHazardousGoods, limitedWeight,
                weightPerAxle, height, width, weight, length, tunnelCatetory)
                - Traffic true/false
                - Departure/arrival
                - TruckType?
                - consumptionModel? customConsumptionDetails?
              */}
            </div>
          </Accordion.Content>
          <Accordion.Title
            active={this.state.activeIndex === 0}
            index={0}
            onClick={this.handleClickAccordion}>
            <Icon name="dropdown" />
            <Label size="small" color="purple">
              {'Range settings'}
            </Label>
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex === 0}>
            <div className="mt3">
              <div className="mt3">
                <Label size="small">{'Range type'}</Label>
                <div className="mt3">
                  <Button.Group basic size="small">
                    {rangeTypes &&
                      Object.keys(rangeTypes).map((key, i) => (
                        <Button
                          active={
                            key === controls[controlindex].settings.rangetype
                          }
                          key={i}
                          mode={key}
                          onClick={() => this.handleRangetype(key)}>
                          {key}
                        </Button>
                      ))}
                  </Button.Group>
                </div>
              </div>
            </div>
            <Divider />
            <div>
              <Label size="small">{'Maximum range'}</Label>
              <div className="mt3">
                <Slider
                  discrete
                  color="grey"
                  value={controls[controlindex].settings.range.value}
                  inverted={false}
                  settings={rangeSettings.settings}
                />
                <div className="mt2 flex justify-between items-center">
                  <Input
                    size="mini"
                    placeholder="Enter Value"
                    onChange={this.handleRangeValueChange.bind(this)}
                  />
                  <Label className="mt2" color="grey" size={'mini'}>
                    {controls[controlindex].settings.range.value + rangetype}
                  </Label>
                </div>
              </div>
            </div>
            <Divider />
            <div>
              <Label size="small">{'Interval step'}</Label>
              <div className="mt3">
                <Slider
                  discrete
                  color="grey"
                  value={controls[controlindex].settings.interval.value}
                  inverted={false}
                  settings={intervalSettings.settings}
                />
                <div className="mt2 flex justify-between items-center">
                  <Input
                    size="mini"
                    placeholder="Enter Value"
                    onChange={this.handleIntervalValueChange.bind(this)}
                  />
                  <Label className="mt2" color="grey" size={'mini'}>
                    {controls[controlindex].settings.interval.value + rangetype}
                  </Label>
                </div>
              </div>
            </div>
          </Accordion.Content>
        </Accordion>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { controls } = state.isochronesControls
  return {
    controls
  }
}

export default connect(mapStateToProps)(Settings)
