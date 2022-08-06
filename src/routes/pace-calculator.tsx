import { Component } from "react";
import colors from "../static/colors";
import styled from "styled-components";

import {distanceUnitOptions, eventDistanceOptions, paceDistanceOptions } from "../static/distances";
import Distance from "../pace-calculator/types/distance";
import Time from "../pace-calculator/types/time";
import Pace from "../pace-calculator/types/pace";
import Unit from "../pace-calculator/types/unit";
import { calculateDistance, calculatePace, calculateTime } from "../pace-calculator/calculator";
import Button from "../components/Button";
import TimeForm from "../components/TimeForm";
import DistanceForm from "../components/DistanceForm";
import PaceForm from "../components/PaceForm";

const DivLight = styled.div`
  background-color: ${colors.light};
  color: ${colors.dark};
  font-family: Nunito Sans;
`;

const TRPrimary = styled.tr`
  background-color: ${colors.primary};
`;

const TDPrimary = styled.td`
  background-color: ${colors.primary};
  vertical-align: top;
  text-align: right;
`;

const TDLight = styled.td`
  background-color: ${colors.light};
  vertical-align: top;
  text-align: center;
`;

type Props = {};

type State = {
  timeHours: string;
  timeMinutes: string;
  timeSeconds: string;

  distanceQuantity: string;
  selectedDistanceUnit: Unit;
  selectedDistanceEventIndex: string;

  paceTimeHours: string;
  paceTimeMinutes: string;
  paceTimeSeconds: string;
  selectedPaceDistanceIndex: string;
};

class PaceCalculator extends Component <Props, State> {
  constructor (props:Props) {
    super(props);
    
    this.state = {
      timeHours: '',
      timeMinutes: '',
      timeSeconds: '',

      distanceQuantity: '',
      selectedDistanceUnit: distanceUnitOptions[0].value,
      selectedDistanceEventIndex: '0',

      paceTimeHours: '',
      paceTimeMinutes: '',
      paceTimeSeconds: '',
      selectedPaceDistanceIndex: '0',
    };
  }

  getTime = ():Time => {
    return new Time(
      Number(this.state.timeHours),
      Number(this.state.timeMinutes),
      Number(this.state.timeSeconds),
    );
  }

  getDistance = ():Distance => {
    return new Distance(
      Number(this.state.distanceQuantity),
      this.state.selectedDistanceUnit,
    );
  }

  getPace = ():Pace => {
    const time = new Time(
      Number(this.state.paceTimeHours),
      Number(this.state.paceTimeMinutes),
      Number(this.state.paceTimeSeconds),
    );

    const selectedPaceDistance = paceDistanceOptions[this.state.selectedPaceDistanceIndex].distance;

    const distance = new Distance(
      selectedPaceDistance.quantity,
      selectedPaceDistance.unit,
    );

    return new Pace(time, distance);
  };

  calculateTime = ():void => {
    const time = calculateTime(this.getPace(), this.getDistance());

    this.setState({
      timeHours: time.hours.toString(),
      timeMinutes: time.minutes.toString(),
      timeSeconds: time.seconds.toString(),
    });
  }

  calculateDistance = ():void => {
    const distance = calculateDistance(this.getTime(), this.getPace(), this.getDistance().unit);

    this.setState({
      distanceQuantity: distance.quantity.toString(),
    });
  }

  calculatePace = ():void => {
    const pace = calculatePace(this.getTime(), this.getDistance(), this.getPace().distance);

    this.setState({
      paceTimeHours: pace.time.hours.toString(),
      paceTimeMinutes: pace.time.minutes.toString(),
      paceTimeSeconds: pace.time.seconds.toString(),
    });
  };

  updateStateField = (field:string, newValue:string) => {
    const updatedState = {};
    updatedState[field] = newValue;
    this.setState(updatedState);
  };

  handleDistanceEventChange = (selectedIndex:string) => {
    let selectedDistanceEvent = eventDistanceOptions[selectedIndex].distance;

    this.setState({
      distanceQuantity: selectedDistanceEvent.quantity,
      selectedDistanceUnit: selectedDistanceEvent.unit,
      selectedDistanceEventIndex: selectedIndex,
    });
  };

  setNumberField = (field:string, value:string) => {
    let newState = {};
    let oldStateValue = this.state[field];

    if (value === '') {
      newState[field] = '';
      this.setState(newState);
      return;
    }
    
    let intValue = Number(value);

    if (isNaN(intValue) || intValue === oldStateValue) {
      newState[field] = value;
      this.setState(newState);
      return;
    }

    newState[field] = intValue;
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <DivLight>
          <table cellSpacing="1" cellPadding="4" border={0} align="center" width="420" bgcolor={colors.darkAccent}>
            <tbody>
              {/* P A C E  C A L C U L A T O R */}
              <TRPrimary>
                <td colSpan={3} align="center">
                  {/* <font color={colors.light}> */}
                    <b color={colors.light}>
                      P&nbsp;A&nbsp;C&nbsp;E &nbsp; C&nbsp;A&nbsp;L&nbsp;C&nbsp;U&nbsp;L&nbsp;A&nbsp;T&nbsp;O&nbsp;R
                    </b>
                  {/* </font> */}
                </td>
              </TRPrimary>

              {/* TIME */}
              <tr>
                <TDPrimary><b color={colors.light}>Time</b></TDPrimary>
                <TDLight>
                  <TimeForm 
                    hours={this.state.timeHours}
                    minutes={this.state.timeMinutes}
                    seconds={this.state.timeSeconds}
                    handleFieldChange={this.updateStateField}
                  ></TimeForm>
                </TDLight>
                <TDLight>
                  To calculate your time, fill in your distance and pace then click here:<br/>
                  <Button onClick={this.calculateTime}> Calculate Time </Button>
                </TDLight>
              </tr>

              {/* DISTANCE */}
              <tr>
                <TDPrimary><b color={colors.light}>Distance</b></TDPrimary>
                <TDLight>
                  <DistanceForm 
                    quantity={this.state.distanceQuantity}
                    selectedUnit={this.state.selectedDistanceUnit}
                    selectedEventIndex={this.state.selectedDistanceEventIndex}
                    handleFieldChange={this.updateStateField}
                    handleEventChange={this.handleDistanceEventChange}
                  ></DistanceForm>
                </TDLight>
                <TDLight>
                  To calculate your distance, fill in your time and pace then click here:<br/>
                  <Button onClick={this.calculateDistance}>Calculate Distance</Button>
                </TDLight>
              </tr>

              {/* PACE */}
              <tr>
                <TDPrimary><b color={colors.light}>Pace</b></TDPrimary>
                <TDLight>
                  <PaceForm
                    timeHours={this.state.paceTimeHours}
                    timeMinutes={this.state.paceTimeMinutes}
                    timeSeconds={this.state.paceTimeSeconds}
                    selectedDistanceIndex={this.state.selectedPaceDistanceIndex}
                    handleFieldChange={this.updateStateField}
                  ></PaceForm>
                </TDLight>
                <TDLight>To calculate your pace, fill in your time and distance then click here:
                  <br/>
                  <Button onClick={this.calculatePace}>Calculate Pace</Button>
                </TDLight>
              </tr>

              {/* BOTTOM */}
              {/* <tr>
                <td colSpan="3" align="center">
                  <input type="button" className="pulldown" onClick="var myform = document.forms[0]; CalcSplits(myform)" value="Calculate Splits"/> 
                  <input type="button"   className="pulldown" value="Reset" onClick="document.forms[0].reset()"/>
                </td>
              </tr> */}
            </tbody>
          </table>
        </DivLight>
      </div>
    );
  }
}

export default PaceCalculator;