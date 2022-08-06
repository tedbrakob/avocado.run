import { Component } from "react";
import styled from "styled-components";
import { paceDistanceOptions } from "../static/distances";
import Select from "./Select";
import TextInput from "./TextInput";

const PaceFormRoot = styled.div`

`;

type Props = {
  timeHours: string;
  timeMinutes: string;
  timeSeconds: string;

  selectedDistanceIndex: string;

  handleFieldChange: (field: string, value: string) => void;
};

export default class PaceForm extends Component <Props> {
  render () {
    return (
      <PaceFormRoot>
        <table>
          <thead>
            <tr>
              <td align="center" className="smallText">hr</td>
              <td align="center" className="smallText">min</td>
              <td align="center" className="smallText">sec</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">
                <TextInput type="text" name="phr" size={2} maxLength={2}
                  value={this.props.timeHours ?? ''}
                  onChange={(event) => {this.props.handleFieldChange('paceTimeHours', event.target.value)}}
                />
              </td>
              <td align="center">
                <TextInput type="text" name="pmin" size={2} maxLength={2}
                  value={this.props.timeMinutes ?? ''}
                  onChange={(event) => {this.props.handleFieldChange('paceTimeMinutes', event.target.value)}}
                />
              </td>
              <td align="center">
                <TextInput type="text" name="psec" size={5} maxLength={6}
                  value={this.props.timeSeconds ?? ''}
                  onChange={(event) => {this.props.handleFieldChange('paceTimeSeconds', event.target.value)}}
                />
              </td>
            </tr>
            <tr>
              <td>Per</td>
              <td colSpan={2}>
                <Select name="punit"
                  onChange={(event) => {this.props.handleFieldChange('selectedPaceDistanceIndex', event.target.value)}}
                  value={this.props.selectedDistanceIndex}>
                    {paceDistanceOptions.map((option, index) => (
                      <option key={index} value={index}>
                        {option.label}
                      </option>
                    ))}
                </Select>
              </td>
            </tr>
          </tbody>
        </table>
      </PaceFormRoot>
    );
  }
}