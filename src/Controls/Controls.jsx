import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Segment,
  Button,
  Popup,
  Input,
  Modal,
  Image,
  Header,
  Divider
} from 'semantic-ui-react'
import SearchControl from './SearchControl'
import { addIsochronesControl } from '../actions/actions'
import { setAppId, setAppCode } from '../actions/hereconfig'

const segmentStyle = {
  zIndex: 999,
  position: 'absolute',
  width: '400px',
  top: '10px',
  left: '10px',
  maxHeight: 'calc(100vh)',
  padding: '0px'
}

class Controls extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddIsochronesControl = this.handleAddIsochronesControl.bind(this)
    this.state = {
      settingsOpen: false
    }
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    controls: PropTypes.array.isRequired,
    hereConfig: PropTypes.object.isRequired
  }

  openSettings = () => this.setState({ settingsOpen: true })
  closeSettings = () => this.setState({ settingsOpen: false })

  handleAddIsochronesControl = () => {
    this.props.dispatch(addIsochronesControl())
  }

  handleAppIdChange = event => {
    const { dispatch } = this.props
    dispatch(setAppId(event.target.value))
  }

  handleAppCodeChange = event => {
    const { dispatch } = this.props
    dispatch(setAppCode(event.target.value))
  }

  render() {
    const { controls, hereConfig } = this.props
    console.log(hereConfig)
    const { settingsOpen } = this.state
    return (
      <div>
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
              <span className="b f6">
                Reachability analysis powered by{' '}
                <a
                  href="https://developer.here.com/"
                  rel="noopener noreferrer"
                  target="_blank">
                  HERE Maps
                </a>
              </span>
              <Popup
                trigger={
                  <Button
                    circular
                    icon="setting"
                    size="mini"
                    onClick={this.openSettings}
                  />
                }
                content="Settings"
                size="mini"
              />
            </div>
          </div>
        </Segment>
        <Modal
          size="tiny"
          dimmer="inverted"
          open={settingsOpen}
          onClose={this.close}>
          <Modal.Header>Settings</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size="small"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/HERE_logo.svg/527px-HERE_logo.svg.png"
            />
            <Modal.Description>
              <Header>
                HERE credentials [*sign up{' '}
                <a
                  href="https://developer.here.com/?create=Freemium-Basic&keepState=true&step=account"
                  target="_blank"
                  rel="noopener noreferrer">
                  <strong>here</strong>
                </a>
                ]
              </Header>
              <div>
                {hereConfig && (
                  <Input
                    fluid
                    label="app_code"
                    labelPosition="right"
                    placeholder="app_code"
                    onChange={this.handleAppCodeChange}
                    value={hereConfig.appCode}
                  />
                )}
              </div>
              <Divider />
              <div>
                {hereConfig && (
                  <Input
                    fluid
                    label="app_id"
                    labelPosition="right"
                    placeholder="app_id"
                    onChange={this.handleAppIdChange}
                    value={hereConfig.appId}
                  />
                )}
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="orange"
              content="Close"
              onClick={this.closeSettings}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { controls } = state.isochronesControls
  const hereConfig = state.hereConfig
  return {
    controls,
    hereConfig
  }
}

export default connect(mapStateToProps)(Controls)
