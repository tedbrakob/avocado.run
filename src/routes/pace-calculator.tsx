import { Component } from "react";
import colors from "../static/colors";
import styled from "styled-components";

import {distanceUnitOptions, eventDistanceOptions, paceDistanceOptions } from "../static/distances";
import Distance from "../pace-calculator/types/distance";
import Time from "../pace-calculator/types/time";
import Pace from "../pace-calculator/types/pace";
import Unit from "../pace-calculator/types/unit";
import { calculateDistance, calculatePace, calculateTime } from "../pace-calculator/calculator";

const DivLight = styled.div`
  background-color: ${colors.light};
  color: ${colors.dark};
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

type Props = {
  time: Time;
  distance: Distance;
  pace: Pace;
};

type State = {
  timeHours: number|null;
  timeMinutes: number|null;
  timeSeconds: number|null;

  distanceQuantity: number|null;
  distanceUnit: Unit;

  paceTimeHours: number|null;
  paceTimeMinutes: number|null;
  paceTimeSeconds: number|null;
  paceDistanceQuantity: number|null;
  paceDistanceUnit: Unit;

  selectedPaceDistanceOptionIndex: number;
  selectedDistanceEventOptionIndex: number;
};

class PaceCalculator extends Component <Props, State> {
  constructor (props) {
    super(props);

    const selectedPaceDistanceOptionIndex = 0;
    const selectedDistanceEventOptionIndex = 0;

    const time = props.time;
    const distance = props.distance ?? eventDistanceOptions[selectedDistanceEventOptionIndex].distance;
    const pace = props.pace ?? {
      distance: paceDistanceOptions[selectedPaceDistanceOptionIndex].distance,
    };
    
    this.state = {
      timeHours: time?.hours,
      timeMinutes: time?.minutes,
      timeSeconds: time?.seconds,

      distanceQuantity: distance?.quantity,
      distanceUnit: distance.unit,

      paceTimeHours: pace.time?.hours,
      paceTimeMinutes: pace.time?.minutes,
      paceTimeSeconds: pace.time?.seconds,
      paceDistanceQuantity: pace.distance.quantity,
      paceDistanceUnit: pace.distance.unit,

      selectedDistanceEventOptionIndex,
      selectedPaceDistanceOptionIndex,
    };
  }

  getTime = ():Time => {
    return new Time(
      this.state.timeHours ?? 0,
      this.state.timeMinutes ?? 0,
      this.state.timeSeconds ?? 0,
    );
  };

  getDistance = ():Distance => {
    return new Distance(
      this.state.distanceQuantity ?? 0,
      this.state.distanceUnit,
    );
  }

  getPace = ():Pace => {
    const time = new Time(
      this.state.paceTimeHours ?? 0,
      this.state.paceTimeMinutes ?? 0,
      this.state.paceTimeSeconds ?? 0,
    );
    const distance = new Distance(
      this.state.paceDistanceQuantity ?? 0,
      this.state.paceDistanceUnit,
    );

    return new Pace(time, distance);
  };

  calculateTime = ():void => {
    const time = calculateTime(this.getPace(), this.getDistance());

    this.setState({
      timeHours: time.hours,
      timeMinutes: time.minutes,
      timeSeconds: time.seconds,
    });
  }

  calculateDistance = ():void => {
    const distance = calculateDistance(this.getTime(), this.getPace());

    this.setState({
      distanceQuantity: distance.quantity,
      distanceUnit: distance.unit,

      selectedDistanceEventOptionIndex: 0
    });
  }

  calculatePace = ():void => {
    const pace = calculatePace(this.getTime(), this.getDistance(), this.getPace().distance);

    this.setState({
      paceTimeHours: pace.time.hours,
      paceTimeMinutes: pace.time.minutes,
      paceTimeSeconds: pace.time.seconds,

      paceDistanceQuantity: pace.distance.quantity,
      paceDistanceUnit: pace.distance.unit,
    });
  };

  handleEventChange = (event) => {
    let selectedDistanceEventOptionIndex = event.target.value;
    let selectedDistanceEvent = eventDistanceOptions[selectedDistanceEventOptionIndex].distance;

    this.setState({ 
      selectedDistanceEventOptionIndex,

      distanceQuantity: selectedDistanceEvent.quantity,
      distanceUnit: selectedDistanceEvent.unit,
    });
  };

  handlePaceDistanceChange = (event) => {
    let selectedPaceDistanceOptionIndex = event.target.value;
    let distance = paceDistanceOptions[selectedPaceDistanceOptionIndex].distance;

    this.setState({
      selectedPaceDistanceOptionIndex,
      paceDistanceUnit: distance.unit,
      paceDistanceQuantity: distance.quantity
    });
  };

  setNumberOrNullStateField = (field:string, value:string) => {
    let newState = {};
    newState[field] = value;

    this.setState(newState);
  };

  render() {
    return (
      <div>
        <DivLight>
          <form method="POST">
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
                    <table>
                      <thead>
                        <tr>
                          <td className="smallText" align="center">hours</td>
                          <td className="smallText" align="center">mins</td>
                          <td className="smallText" align="center">secs</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td align="center">
                            <input type="text" size={2} maxLength={2}
                              value={this.state.timeHours ?? ''}
                              onChange={ (event) => {this.setNumberOrNullStateField('timeHours', event.target.value)}}
                            />
                          </td>
                          <td align="center">
                            <input type="text" size={2} maxLength={2} 
                              value={this.state.timeMinutes ?? ''}
                              onChange={ (event) => {this.setNumberOrNullStateField('timeMinutes', event.target.value)}}
                          />
                          </td>
                          <td align="center">
                            <input type="text" name="tsec" size={5} maxLength={6}
                              value={this.state.timeSeconds ?? ''}
                              onChange={ (event) => {this.setNumberOrNullStateField('timeSeconds', event.target.value)}}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </TDLight>
                  <TDLight>
                    To calculate your time, fill in your distance and pace then click here:<br/>
                    <input type="button" className="pulldown" onClick={this.calculateTime} value="Calculate Time"/>
                  </TDLight>
                </tr>

                {/* DISTANCE */}
                <tr>
                  <TDPrimary><b color={colors.light}>Distance</b></TDPrimary>
                  <TDLight>
                    <input type="text" name="dist" size={7} maxLength={8}
                      value={this.state.distanceQuantity ?? ''}
                      onChange={ (event) => {this.setNumberOrNullStateField('distanceQuantity', event.target.value)}}
                    /> 
                    <select name="dunit" className="pulldown"
                      value={this.state.distanceUnit} 
                      onChange={ (event) => {this.setNumberOrNullStateField('distanceUnit', event.target.value)}}
                    >
                      {distanceUnitOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <br/>
                    or
                    <br/>
                    <select name="event" className="pulldown"
                      onChange={this.handleEventChange} 
                      value={this.state.selectedDistanceEventOptionIndex}>
                        {eventDistanceOptions.map((option, index) => (
                          <option key={index} value={index}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                  </TDLight>
                  <TDLight>
                    To calculate your distance, fill in your time and pace then click here:<br/>
                    <input type="button" className="pulldown" onClick={this.calculateDistance} value="Calculate Distance"/>
                  </TDLight>
                </tr>
                

                {/* PACE */}
                <tr>
                  <TDPrimary><b color={colors.light}>Pace</b></TDPrimary>
                  <TDLight>
                    <table>
                      <tbody>
                        <tr>
                          <td align="center" className="smallText">hr</td>
                          <td colSpan={2} align="center" className="smallText">min  sec</td>
                        </tr>
                        <tr>
                          <td align="center">
                            <input type="text" name="phr" size={2} maxLength={2}
                              value={this.state.paceTimeHours ?? ''}
                              onChange={(event) => {this.setNumberOrNullStateField('paceTimeHours', event.target.value)}}
                            />
                          </td>
                          <td colSpan={2} align="center">
                            <input type="text" name="pmin" size={2} maxLength={2}
                              value={this.state.paceTimeMinutes ?? ''}
                              onChange={(event) => {this.setNumberOrNullStateField('paceTimeMinutes', event.target.value)}}
                            />
                            <input type="text" name="psec" size={5} maxLength={6}
                              value={this.state.paceTimeSeconds ?? ''}
                              onChange={(event) => {this.setNumberOrNullStateField('paceTimeSeconds', event.target.value)}}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Per</td>
                          <td>
                            <select name="punit" size={1} className="pulldown"
                              onChange={this.handlePaceDistanceChange}
                              value={this.state.selectedPaceDistanceOptionIndex}>
                                {paceDistanceOptions.map((option, index) => (
                                  <option key={index} value={index}>
                                    {option.label}
                                  </option>
                                ))}
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </TDLight>
                  <TDLight>To calculate your pace, fill in your time and distance then click here:
                    <br/>
                    <input type="button" className="pulldown" onClick={this.calculatePace} value="Calculate Pace"/>
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
          </form>
        </DivLight>
      </div>
    );
  }
}

export default PaceCalculator;