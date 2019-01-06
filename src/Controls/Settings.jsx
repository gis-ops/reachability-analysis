import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Slider } from "react-semantic-ui-range";
import { Label, Input } from "semantic-ui-react";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 60
    };
  }

  handleValueChange(e, { value }) {
    this.setState({
      value: value
    });
  }

  render() {
    const settings = {
      start: this.state.value,
      min: 1,
      max: 600,
      step: 5,
      onChange: value => {
        this.setState({
          value: value
        });
      }
    };

    //const { controls } = this.props;
    return (
      <div>
        <Label size="small" color="orange">{"Range"}</Label>
        <div className="mt3">
          <Slider discrete color="grey" value={this.state.value} inverted={false} settings={settings} />
          <div className="mt2 flex justify-between items-center">
            <Input size="mini" placeholder="Enter Value" onChange={this.handleValueChange.bind(this)}/>
            <Label className="mt2" color="grey" size={"mini"}>
              {this.state.value + " minutes"}
            </Label>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  const { controls } = state.isochronesControls;
  console.log(controls);
  return {
    controls
  };
};

export default connect(mapStateToProps)(Settings);
