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
  maxHeight: 'calc(100vh)',
  padding: '0px'
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

  handleSettings = () => {
    console.log('open settings modal')
    // singleComponent
    // resolution
    // maxPoints
    // Quality
    // https://developer.here.com/documentation/routing/topics/resource-calculate-isoline.html
  }

  render() {
    const { controls } = this.props
    return (
      <Segment className="flex flex-column" style={segmentStyle}>
        <div>
          <div style={{ flex: 1, display: 'flex', minHeight: '0px' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <div
                style={{
                  maxHeight: 'calc(100vh - 7vw)',
                  overflow: 'auto'
                }}>
                {controls &&
                  controls.map((object, i) => (
                    <SearchControl key={i} controlindex={i} />
                  ))}
                <div
                  style={{
                    marginLeft: '20px',
                    marginBottom: '20px',
                    marginTop: '0px'
                  }}>
                  <Popup
                    trigger={
                      <Button
                        circular
                        icon="plus"
                        className="ma3"
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
          <div
            style={{
              height: '40px',
              //borderTop: '1px solid #f7deff',
              boxShadow: '2px -5px 5px -5px #333',
              position: 'relative'
            }}
            className="flex justify-between items-center pa3">
            <span className="b f6">HERE Isolines App</span>
            <Popup
              trigger={
                <Button
                  circular
                  icon="setting"
                  size="mini"
                  onClick={this.handleSettings}
                />
              }
              content="Settings"
              size="mini"
            />
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
