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
  grid-template-rows: min-content min-content 1fr 1fr min-content;
  grid-template-columns: min-content 2fr 2fr;

  max-width: ${maxGridWidth};
  margin: 0 auto;

  background-color: ${colors.dark};
  border: solid 1px ${colors.dark};

  @media (max-width: ${maxGridWidth}) {  
    grid-template-rows: repeat(8, min-content);
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

const GridFooter = styled(GridElement)`
  grid-column: auto / span 2;
  background-color: ${colors.light};
  padding: 4px;
  flex-direction: row;
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

const defaultState:State = {
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

class PaceCalculator extends Component <Props, State> {
  constructor (props:Props) {
    super(props);
    
    this.state = defaultState;
  }

  reset = ():void => {
    this.setState(defaultState);
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

  calcSplits = () => {
    // // Main routine for Splits
    // // Validate required data, do computation, and display results
    // // Splits = Time at each interval (Dist / Pace)
    // let gottime = this.checkPace(form);
    // let gotpace = this.checkTime(form);
    // if (!(gottime || gotpace)){
    //   alert("To calculate Splits, enter the Pace and Distance or Time and Distance");
    //   return;
    // }

    // // get dist, pace, and punit
    // // time in total seconds, pace in total seconds
    // if (!(gotpace) && (gottime)){
    //   this.setState({
    //     punit: form.punit.options[form.punit.selectedIndex].value,
    //     dunit: form.dunit.options[form.dunit.selectedIndex].value,
    //   });
      
    //   let factor = this.convUnit(this.state.dunit, this.state.punit);
    //   this.setState({
    //     pace: (this.state.time / this.state.dist) / factor,
    //   });
    // }

    // let dcalc = form.dunit.options[form.dunit.selectedIndex].value;
    // let pcalc = form.punit.options[form.punit.selectedIndex].value;
    // let factor = this.convUnit(dcalc, pcalc);
    // let pdisp = form.punit.options[form.punit.selectedIndex].text;

    // this.setState({
    //   dist: this.state.dist * factor,
    // });

    // let remain = this.state.dist % 1;

    // this.setState({
    //   nsplits: this.state.dist - remain,
    // });

    // // compute hgt based on number of splits
    // let hgt = this.state.nsplits * 34;
    // hgt = hgt.toString(10);

    // let features = "resizable,scrollbars,height=" + hgt + ",width=250,";
    // let swin = window.open("","",features);
    // swin.document.writeln("<HTML><HEAD><TITLE>Splits</TITLE><HEAD><BODY>\n");
    // swin.document.writeln("<table cellSpacing=2><tr bgcolor=#C6E2FF><td colSpan=2 align=left>Splits</td><td>Times</td></tr>\n");

    // let stime = 0;

    // for (let split = 1; split <= this.state.nsplits; split++) {
    //   stime = stime + this.state.pace;
    //   let shours = this.HrsFromTSecs(stime);
    //   let smins = this.MinsFromTSecs(stime);
    //   let ssecs = this.SecsFromTSecs(stime);
    //   let hmstime = shours + ":" + smins + ":" + ssecs.substring(0,5);
    //   swin.document.writeln("<tr><td>" + split + "</td><td>" + pdisp + "</td><td>" +hmstime + "</td></tr>\n");
    // }

    // // the last split is for the total dist
    // if (this.state.nsplits !== this.state.dist) {
    //   let extrasecs = remain * this.state.pace;
    //   stime = stime + extrasecs;
    //   let shours = this.HrsFromTSecs(stime);
    //   let smins = this.MinsFromTSecs(stime);
    //   let ssecs = this.SecsFromTSecs(stime);
    //   let hmstime = shours + ":" + smins + ":" + ssecs.substring(0,5);
    //   swin.document.writeln("<tr><td>" + this.state.dist + "</td><td>" + pdisp + "</td><td>" +hmstime + "</td></tr>\n");
    // }

    // swin.document.writeln("</table></BODY></HTML>\n");
  }

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

          <RowLabel></RowLabel>
          <GridFooter>
            {/* <Button onClick={this.calcSplits}>Calculate Splits</Button> */}
            <Button onClick={this.reset}>Reset</Button>
          </GridFooter>
        </Grid>
      </PaceCalculatorRoot>
    );
  }
}

export default PaceCalculator;