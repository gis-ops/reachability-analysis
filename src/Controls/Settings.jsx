import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Slider } from "react-semantic-ui-range";
import { Label, Input, Button, Divider } from "semantic-ui-react";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeValue: 60,
      intervalValue: 10
    };
  }

  handleRangeValueChange(e, { value }) {
    this.setState({
      rangeValue: value
    });
  }

  handleIntervalValueChange(e, { value }) {
    this.setState({
      intervalValue: value
    });
  }

  render() {
    const rangeSettings = {
      start: this.state.rangeValue,
      min: 1,
      max: 600,
      step: 5,
      onChange: value => {
        this.setState({
          rangeValue: value
        });
      }
    };

    const intervalSettings = {
      start: this.state.intervalValue,
      min: 1,
      max: 600,
      step: 5,
      onChange: value => {
        this.setState({
          intervalValue: value
        });
      }
    };

    const transportModes = {
      pedestrian: {
        name: "pedestrian",
        type: ["fastest", "shortest"],
        traffic: ["enabled", "disabled"]
      },
      car: {
        name: "car",
        type: ["fastest", "shortest", "traffic"],
        traffic: ["enabled", "disabled"],
        consumptionModel: ["default", "standard"],
        customConsumptionDetails: {}
      },
      truck: {
        name: "truck",
        type: ["fastest"],
        shippedHazardousGoods: [],
        limitedWeight: {},
        weightPerAxle: {},
        height: {},
        width: {},
        length: {},
        tunnelCategory: [],
        consumptionModel: ["default", "standard"],
        customConsumptionDetails: {}
      }
    };

    //const { controls } = this.props;
    return (
      <div>
        <div className="mb3">
          <Label size="small" color="purple">
            {"Mode"}
          </Label>
          <div className="mt3">
            <Button.Group basic size="small">
              {transportModes &&
                Object.keys(transportModes).map((key, i) => (
                  <Button key={i}>{transportModes[key].name}</Button>
                ))}
            </Button.Group>
          </div>
        </div>
        <Divider />
        <div>
          <Label size="small" color="purple">
            {"Range"}
          </Label>
          <div className="mt3">
            <Slider
              discrete
              color="grey"
              value={this.state.rangeValue}
              inverted={false}
              settings={rangeSettings}
            />
            <div className="mt2 flex justify-between items-center">
              <Input
                size="mini"
                placeholder="Enter Value"
                onChange={this.handleRangeValueChange.bind(this)}
              />
              <Label className="mt2" color="grey" size={"mini"}>
                {this.state.rangeValue + " minutes"}
              </Label>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <Label size="small" color="purple">
            {"Interval"}
          </Label>
          <div className="mt3">
            <Slider
              discrete
              color="grey"
              value={this.state.intervalValue}
              inverted={false}
              settings={intervalSettings}
            />
            <div className="mt2 flex justify-between items-center">
              <Input
                size="mini"
                placeholder="Enter Value"
                onChange={this.handleIntervalValueChange.bind(this)}
              />
              <Label className="mt2" color="grey" size={"mini"}>
                {this.state.intervalValue + " minutes"}
              </Label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { controls } = state.isochronesControls;
  return {
    controls
  };
};

export default connect(mapStateToProps)(Settings);
