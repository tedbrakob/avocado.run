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

const maxGridWidth = '480px';

const PaceCalculatorRoot = styled.div`
  width: 100%;

  background-color: ${colors.light};
  color: ${colors.dark};
  font-family: Nunito Sans;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-rows: min-content min-content 1fr 1fr;
  grid-template-columns: min-content 2fr 2fr;

  max-width: ${maxGridWidth};
  margin: 0 auto;

  background-color: ${colors.dark};
  border: solid 1px ${colors.dark};

  @media (max-width: ${maxGridWidth}) {  
    grid-template-rows: repeat(7, min-content);
    grid-template-columns: 1fr 2fr;
  }
`;

const GridElement = styled.div`
  background-color: ${colors.light};
  text-align: right;

  text-align: center;
  padding: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RowLabel = styled(GridElement)`
  font-weight: bold;
  background-color: ${colors.primary};

  grid-column: 1 / 2 ;
  @media (max-width: ${maxGridWidth}) {  
    grid-column: 1 / 3;
  }
`;

const Header = styled.div`
  grid-column: 1 / -1;
  background-color: ${colors.primary};
  text-align: center;
  padding: 4px;
  font-size: large;
  font-weight: 700;
`;

const HelpText = styled.span`
  @media (max-width: ${maxGridWidth}) {  
    display: none;
  }
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

  updateStateField = (field:string, newValue:string):void => {
    const updatedState = {};
    updatedState[field] = newValue;
    this.setState(updatedState);
  };

  handleDistanceEventChange = (selectedIndex:string):void => {
    let selectedDistanceEvent = eventDistanceOptions[selectedIndex].distance;

    this.setState({
      distanceQuantity: selectedDistanceEvent.quantity,
      selectedDistanceUnit: selectedDistanceEvent.unit,
      selectedDistanceEventIndex: selectedIndex,
    });
  };

  render() {
    return (
      <PaceCalculatorRoot>
        <Grid>
          <Header>
            <b color={colors.light}>
              P A C E &nbsp; C A L C U L A T O R
            </b>
          </Header>

          <RowLabel>Time</RowLabel>
          <GridElement>
            <TimeForm 
              hours={this.state.timeHours}
              minutes={this.state.timeMinutes}
              seconds={this.state.timeSeconds}
              handleFieldChange={this.updateStateField}
            ></TimeForm>
          </GridElement>
          <GridElement>
            <HelpText>To calculate your time, fill in your distance and pace then click here:<br/></HelpText>
            <Button onClick={this.calculateTime}> Calculate Time </Button>
          </GridElement>

          <RowLabel>Distance</RowLabel>
          <GridElement>
            <DistanceForm 
              quantity={this.state.distanceQuantity}
              selectedUnit={this.state.selectedDistanceUnit}
              selectedEventIndex={this.state.selectedDistanceEventIndex}
              handleFieldChange={this.updateStateField}
              handleEventChange={this.handleDistanceEventChange}
            ></DistanceForm>
          </GridElement>
          <GridElement>
            <HelpText>To calculate your distance, fill in your time and pace then click here:<br/></HelpText>
            <Button onClick={this.calculateDistance}>Calculate Distance</Button>
          </GridElement>

          <RowLabel>Pace</RowLabel>
          <GridElement>
            <PaceForm
              timeHours={this.state.paceTimeHours}
              timeMinutes={this.state.paceTimeMinutes}
              timeSeconds={this.state.paceTimeSeconds}
              selectedDistanceIndex={this.state.selectedPaceDistanceIndex}
              handleFieldChange={this.updateStateField}
            ></PaceForm>
          </GridElement>
          <GridElement>
            <HelpText>To calculate your pace, fill in your time and distance then click here:<br/></HelpText>
            <Button onClick={this.calculatePace}>Calculate Pace</Button>
          </GridElement>
        </Grid>

        {/* <table cellSpacing="1" cellPadding="4" border={0} align="center" width='420'  bgcolor={colors.darkAccent}>
          <tr>
            <td colSpan="3" align="center">
              <input type="button" className="pulldown" onClick="var myform = document.forms[0]; CalcSplits(myform)" value="Calculate Splits"/> 
              <input type="button"   className="pulldown" value="Reset" onClick="document.forms[0].reset()"/>
            </td>
          </tr>
        </table> */}
      </PaceCalculatorRoot>
    );
  }
}

export default PaceCalculator;