import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { TeamEventDetails, TeamResults } from "../../http/nyrr";
import getDivisionName from "../../nyrr/divisionNames";
import Table from "../Table";

type EventDetails = {
  distanceName: string,
  distanceUnitCode: string,
  eventCode: string,
  eventName: string,
  startDateTime: string,
};

type Props = {
  divisionName: string,
  divisionCode: string,
  divisionResults: TeamResults[],
  maxRows?: number,
  showDetailsLink: boolean,
};

export default function DivisionResults (props: Props) {
  const columnHelper = createColumnHelper<{
    teamName: string,
    teamPlace: string,
    totalPoints: string,
    races: TeamEventDetails[],
  }>();

  const races:EventDetails[] = [];
  if (props.divisionResults.length > 0) {
    const firstTeamRaceResults = props.divisionResults[0].eventDetails ?? [];
    for (const race  of firstTeamRaceResults) {
      races.push({
        distanceName: race.distanceName,
        distanceUnitCode: race.distanceUnitCode,
        eventCode: race.eventCode,
        eventName: race.eventName,
        startDateTime: race.startDateTime,
      });
    }
  }

  const columns = [
    columnHelper.accessor('teamPlace', {
      header: 'Place',
      cell: info => <div className="text-right mx">{info.getValue()}</div>,
    }),
    columnHelper.accessor('teamName', {
      header: 'Team',
      cell: info => <div className="pr-2"> {info.getValue()} </div>,
    }), 
    columnHelper.accessor('totalPoints', {
      header: 'Points',
      cell: info => <div className="text-right">{info.getValue()}</div>,
    }),
    ...races.map(race =>
      columnHelper.accessor(
        row => {
          return row.races.filter((teamEventResult) => {
            return teamEventResult.eventCode === race.eventCode;
          })[0].points ?? '-';
        },
        { 
          id: race.eventCode, 
          header: `${new Date(race.startDateTime).getMonth() + 1}/${new Date(race.startDateTime).getDate()}`,
          cell: info => <div className="text-right">{info.getValue()}</div>,
        }
      )
    ),
  ];

  const divisionResults = props.divisionResults.map(teamResult => {
    return {
      teamName: teamResult.teamName,
      teamPlace: teamResult.teamPlace.toString(),
      totalPoints: teamResult.totalPoints.toString(),
      races: teamResult.eventDetails,
    };
  })

  const rowDisplayCount = props.maxRows ?? divisionResults.length

  const truncatedResults = divisionResults.slice(0, rowDisplayCount);
  const hiddenRowCount = divisionResults.length - rowDisplayCount;

  if (divisionResults.length > rowDisplayCount) {
    truncatedResults.push({
      teamName: `${hiddenRowCount} more...`,
      teamPlace: '',
      totalPoints: '',
      races: [],
    })
  }

  return (
    <div className="mx-auto">
      <Table
        data={truncatedResults}
        columns={columns}
        header={getDivisionName(props.divisionCode)}
        footer={ 
          props.showDetailsLink ? 
          (<Link to={`division/${props.divisionCode}`}>Show Details</Link>)
          : (<div/>)
        }
      />
    </div>
  );
}