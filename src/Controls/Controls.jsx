import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Segment, Button, Popup, Icon } from 'semantic-ui-react'
import SearchControl from './SearchControl'
import { addIsochronesControl } from '../actions/actions'

const segmentStyle = {
  zIndex: 999,
  position: 'absolute',
  width: '400px',
  top: '0',
  left: '10px',
  maxHeight: 'calc(100vh - 2vw)'
}

class Controls extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddIsochronesControl = this.handleAddIsochronesControl.bind(this)
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    controls: PropTypes.array.isRequired
  }

  handleAddIsochronesControl = () => {
    this.props.dispatch(addIsochronesControl())
  }

  render() {
    const { controls } = this.props
    return (
      <Segment className="flex flex-column" style={segmentStyle}>
        <div
          style={{ height: '50px' }}
          className="flex justify-between items-center">
          <span className="b f4">HERE Isolines App</span>
          <Icon name="setting" size="large" color="grey" />
        </div>
        <div>
          <div style={{ flex: 1, display: 'flex', minHeight: '0px' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <div
                style={{ maxHeight: 'calc(100vh - 10vw)', overflow: 'auto' }}>
                {controls &&
                  controls.map((object, i) => (
                    <SearchControl key={i} controlindex={i} />
                  ))}
                <Popup
                  trigger={
                    <Button
                      circular
                      icon="plus"
                      onClick={this.handleAddIsochronesControl}
                    />
                  }
                  content="Add"
                  size="mini"
                />
              </div>
            </div>
          </div>
        </div>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  const { controls } = state.isochronesControls
  return {
    controls
  }
}

export default connect(mapStateToProps)(Controls)
