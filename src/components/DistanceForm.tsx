import { Component } from "react";
import TextInput from "./TextInput";
import Select from "./Select";
import Unit from "../pace-calculator/types/unit";
import { distanceUnitOptions, eventDistanceOptions } from "../static/distances";

type Props = {
  error: boolean;
  quantity: string;
  selectedUnit: Unit;
  selectedEventIndex: string;

  handleFieldChange: (field: string, newValue: string) => void;
  handleEventChange: (index: string) => void;
}

export default class DistanceForm extends Component <Props> {
  render () {
    return (
      <div>
        <TextInput 
          size={7} maxLength={8}
          error={this.props.error}
          inputMode="decimal"
          type="number" pattern="\d*"
          value={this.props.quantity?.toString() ?? ''}
          onChange={ (event) => {this.props.handleFieldChange('distanceQuantity', event.target.value)} }
        /> 
        <Select name="dunit" className="pulldown"
          value={this.props.selectedUnit} 
          onChange={ (event) => {this.props.handleFieldChange('selectedDistanceUnit', event.target.value)} }
        >
          {distanceUnitOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <br/>
        or
        <br/>
        <Select name="event"
          onChange={ (event) => {this.props.handleEventChange(event.target.value)} } 
          value={this.props.selectedEventIndex}>
            {eventDistanceOptions.map((option, index) => (
              <option key={index} value={index}>
                {option.label}
              </option>
            ))}
        </Select>
      </div>
    );
  }
}