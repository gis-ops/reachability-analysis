import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Settings from './Settings'
import {
  Segment,
  Search,
  Icon,
  Container,
  Popup,
  Divider,
  Button
} from 'semantic-ui-react'
import {
  updateTextInput,
  fetchHereGeocode,
  updateSelectedAddress,
  removeIsochronesControl,
  fetchHereIsochrones
} from '../actions/actions'

import { zoomToPoint, zoomToIsochrones } from '../actions/map'

import InlineEdit from 'react-edit-inline2'
import { debounce } from 'throttle-debounce'

class SearchControl extends React.Component {
  static propTypes = {
    userTextInput: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isFetchingIsochrones: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    controls: PropTypes.array.isRequired,
    isochronesResults: PropTypes.array,
    controlindex: PropTypes.number.isRequired,
    hereConfig: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.dataChanged = this.dataChanged.bind(this)

    this.state = {
      isochronesTitle: 'Isochrones -' + (props.controlindex + 1)
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.fetchGeocodeResults = debounce(1000, this.fetchGeocodeResults)
  }

  fetchGeocodeResults() {
    const { dispatch, userTextInput, controlindex, hereConfig } = this.props
    if (userTextInput.length > 0) {
      dispatch(
        fetchHereGeocode({
          inputValue: userTextInput,
          controlIndex: controlindex,
          hereConfig: hereConfig
        })
      )
    }
  }

  handleSearchChange = event => {
    const { dispatch, controlindex } = this.props

    dispatch(
      updateTextInput({
        inputValue: event.target.value,
        controlIndex: controlindex
      })
    )
    this.fetchGeocodeResults()
  }

  // handleSelectionChange = event => {
  //   console.log(event.target.value);
  // };

  handleResultSelect = (e, { result }) => {
    const { dispatch, controlindex } = this.props

    dispatch(
      updateTextInput({
        inputValue: result.title,
        controlIndex: controlindex
      })
    )

    dispatch(
      updateSelectedAddress({
        inputValue: result.title,
        controlIndex: controlindex
      })
    )

    dispatch(zoomToPoint(result.displayposition))
  }

  customValidateText(text) {
    return text.length > 0 && text.length < 64
  }

  dataChanged(data) {
    this.setState({ ...data })
  }

  handleFetchIsochrones = () => {
    const { dispatch, controlindex, controls, hereConfig } = this.props
    console.log(hereConfig)
    let displayposition
    for (let result of controls[controlindex].geocodeResults) {
      if (result.selected) displayposition = result.displayposition
    }

    dispatch(
      fetchHereIsochrones({
        controlIndex: controlindex,
        settings: controls[controlindex].settings,
        center: displayposition,
        hereConfig: hereConfig
      })
    )
  }

  handleZoom = () => {
    const { dispatch, controlindex } = this.props
    dispatch(zoomToIsochrones(controlindex))
  }

  render() {
    const {
      isFetching,
      isFetchingIsochrones,
      userTextInput,
      results,
      controls,
      controlindex,
      isochronesResults
    } = this.props

    const handleRemoveControl = () => {
      if (controls.length > 1) {
        this.props.dispatch(
          removeIsochronesControl({ controlIndex: controlindex })
        )
      }
    }

    const isResultSelected = () => {
      for (let result of results) {
        if (result.selected) return false
      }

      return true
    }
    return (
      <Segment style={{ margin: '20px' }}>
        <div className="mb2 justify-between flex flex-row items-center">
          <div>
            <Popup
              trigger={<Icon name="pencil" />}
              content="Edit name"
              size="mini"
            />

            <InlineEdit
              validate={this.customValidateText}
              activeClassName="editing"
              text={this.state.isochronesTitle}
              paramName="isochronesTitle"
              change={this.dataChanged}
              style={{
                minWidth: 150,
                display: 'inline-block',
                margin: '0 0 0 0',
                padding: 0,
                fontWeight: 'bold',
                fontSize: 15,
                outline: 'none',
                border: 'none'
              }}
            />
          </div>
          {isochronesResults && isochronesResults.length > 0 && (
            <Popup
              trigger={
                <Button
                  circular
                  size="mini"
                  icon="unhide"
                  style={{ float: 'right' }}
                  onClick={this.handleShow}
                  className="pr3"
                />
              }
              content="Toggle on map"
              size="mini"
            />
          )}
          {isochronesResults && isochronesResults.length > 0 && (
            <Popup
              trigger={
                <Button
                  circular
                  icon="expand arrows alternate"
                  style={{ float: 'right' }}
                  size="mini"
                  onClick={this.handleZoom}
                  className="pr4"
                />
              }
              content="Zoom"
              size="mini"
            />
          )}
          <Popup
            trigger={
              <Button
                circular
                size="mini"
                icon="remove"
                style={{ float: 'right' }}
                onClick={handleRemoveControl}
              />
            }
            content="Remove"
            size="mini"
          />
        </div>
        <Divider fitted />
        <div className="flex justify-between items-center mt3">
          <Search
            onSearchChange={this.handleSearchChange}
            onResultSelect={this.handleResultSelect}
            type="text"
            fluid
            input={{ fluid: true }}
            loading={isFetching}
            className="flex-grow-1 mr2"
            results={results}
            value={userTextInput}
            placeholder="Find Address ..."
          />
          <Popup
            trigger={
              <Button
                circular
                loading={isFetchingIsochrones}
                disabled={isResultSelected()}
                color="purple"
                icon="globe"
                onClick={this.handleFetchIsochrones}
              />
            }
            content="Compute isochrones"
            size="mini"
          />
        </div>
        <Container className="mt2">
          <Settings controlindex={controlindex} />
        </Container>
      </Segment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const userTextInput =
    state.isochronesControls.controls[ownProps.controlindex].userInput
  const results =
    state.isochronesControls.controls[ownProps.controlindex].geocodeResults
  const isochronesResults =
    state.isochronesControls.controls[ownProps.controlindex].isochrones.results
  const isFetching =
    state.isochronesControls.controls[ownProps.controlindex].isFetching
  const isFetchingIsochrones =
    state.isochronesControls.controls[ownProps.controlindex]
      .isFetchingIsochrones
  const controls = state.isochronesControls.controls
  const hereConfig = state.hereConfig

  const mapEvents = state.mapEvents

  return {
    userTextInput,
    results,
    isFetching,
    isFetchingIsochrones,
    controls,
    mapEvents,
    hereConfig,
    isochronesResults
  }
}

export default connect(mapStateToProps)(SearchControl)
