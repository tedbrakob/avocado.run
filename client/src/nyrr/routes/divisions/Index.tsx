import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import styled from "styled-components";
import { DivisionResults } from "nyrr-results-api/build/types";
import DivisionResultsComponent from "../../components/DivisionResults";
import LoadingScreen from "../../components/LoadingScreen";
import { fetchDivisionsResults } from "../../http/nyrr";

const maxSingleColumnViewWidth = '1120px';

const Grid = styled.div`
  @media (max-width: ${maxSingleColumnViewWidth}) {  
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const GridPaddingElement = styled.div<{span: number}>`
  grid-column: span ${props => props.span} / span ${props => props.span};

  @media (max-width: ${maxSingleColumnViewWidth}) {  
    display: none;
  }
`;

type Props = {
  year: number,
}

export default function Index(props: Props) {
  const { isLoading, error, data } = useQuery(
    ['nyrr-fetchDivisionsResults', props.year],
    () => fetchDivisionsResults(props.year)
  );

  if (error) {
    console.log(error);
  }

  if (isLoading || data === undefined) {
    return (
      <LoadingScreen/>
    );
  }

  const gridRows: DivisionResults[][] = [];

  let currentGroup = '';
  let currentRow: DivisionResults[] = [];

  for (const division of data) {
    let newGroup = division.divisionCode.slice(0, -1);

    if (newGroup !== currentGroup && currentGroup !== '') {
      gridRows.push(currentRow);
      currentRow = [];
    }

    currentRow.push(division);
    currentGroup = newGroup;
  }

  gridRows.push(currentRow);

  return (
    <div className="p-2 max-w-fit m-auto">
      <Grid className="grid grid-cols-6">
        {gridRows.map((gridRow, gridRowIndex) => {
          const rowPadding = (6 - (2 * gridRow.length)) / 2;
          const gridRowElements: ReactElement[] = [];

          if (rowPadding > 0) {
            gridRowElements.push(
              <GridPaddingElement
                key={`${gridRowIndex}-start-padding`}
                span={rowPadding}
              ></GridPaddingElement>
            );
          }

          for (const division of gridRow) {
            gridRowElements.push(
              <div
                className="p-2 col-span-2"
                key={division.divisionCode}
              >
                <DivisionResultsComponent
                  key={division.divisionCode}
                  divisionName={division.divisionName}
                  divisionCode={division.divisionCode}
                  divisionResults={division.teamResults}
                  maxRows={10}
                  showDetailsLink={true}
                />
              </div>
            );
          }

          if (rowPadding > 0) {
            gridRowElements.push(
              <GridPaddingElement
                key={`${gridRowIndex}-end-padding`}
                span={rowPadding}
              ></GridPaddingElement>
            );
          }

          return gridRowElements;
        })}
      </Grid>
    </div>
  );
}