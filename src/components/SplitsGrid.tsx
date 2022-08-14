import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import Splits from "../pace-calculator/types/splits";
import colors from "../static/colors";

interface GridProps {
  maxWidth: string;
};

const Grid = styled.div<GridProps>`
  display: grid;
  grid-gap: 1px;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;

  max-width: ${(props) => props.maxWidth};
  margin: 0 auto;

  background-color: ${colors.dark};
  border: solid 1px ${colors.dark};

  @media (max-width: ${(props) => props.maxWidth}) {  
    grid-template-rows: repeat(8, min-content);
    grid-template-columns: 1fr 2fr;
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

type Props = {
  splits: Splits | null;
  maxWidth: string;
  headerRef: React.RefObject<HTMLInputElement>;
};

export default class SplitsGrid extends Component <Props> {
  render(): ReactNode {
    if (this.props.splits === null) {
      return null;
    }

    return (
      <Grid maxWidth={this.props.maxWidth}>
        <Header>
          <b color={colors.light} ref={this.props.headerRef}>
            S P L I T S
          </b>
        </Header>
        {
          this.props.splits.splits.map((el, i) => {
            return [
              <GridElement key={i.toString() + "-distance"}>{el.distance.quantity.toString() + " " + el.distance.unit}</GridElement>,
              <GridElement key={i.toString() + "-time"}>{el.time.toString()}</GridElement>
            ]
          })
        }
      </Grid>
    );
  }
}