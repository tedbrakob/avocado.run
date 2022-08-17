import { Component } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";

const TimeFormRoot = styled.div`
  table {
    margin-left: auto;
    margin-right: auto;
  }
`;

type Props = {
  error: boolean;
  hours: string;
  minutes: string;
  seconds: string;
  handleFieldChange: (field: string, value: string) => void;
};

export default class TimeForm extends Component <Props> {
  render () {
    return (
      <TimeFormRoot>
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
                <TextInput size={2} maxLength={2}
                  error={this.props.error}
                  inputMode="numeric"
                  type="number" pattern="\d*"
                  value={this.props.hours ?? ''}
                  onChange={ (event) => {this.props.handleFieldChange('timeHours', event.target.value)} }
                />
              </td>
              <td align="center">
                <TextInput size={2} maxLength={2} 
                  error={this.props.error}
                  inputMode="numeric"
                  type="number" pattern="\d*"
                  value={this.props.minutes ?? ''}
                  onChange={ (event) => {this.props.handleFieldChange('timeMinutes', event.target.value)} }
              />
              </td>
              <td align="center">
                <TextInput name="tsec" size={5} maxLength={6}
                  error={this.props.error}
                  inputMode="decimal"
                  type="number" pattern="\d*"
                  value={this.props.seconds ?? ''}
                  onChange={ (event) => {this.props.handleFieldChange('timeSeconds', event.target.value)} }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </TimeFormRoot>
    );
  }
}