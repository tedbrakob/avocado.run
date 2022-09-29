import { createColumnHelper } from "@tanstack/react-table";
import { TeamEventDetails, TeamResults } from "../http/nyrr";
import getDivisionName from "../divisionNames";
import { LinkWithQuery } from "../../components/LinkWithQuery";
import Table from "../../components/Table";
import { EventDetails } from "../types";
import EventDetailsTable from "./EventDetailsTable";

type Props = {
  divisionName: string,
  divisionCode: string,
  divisionResults: TeamResults[],
  maxRows?: number,
  showDetailsLink: boolean,
  noWrap?: boolean,
};

function getEventKeyComponents(races: EventDetails[]) {
  if (races.length === 0) {
    return null;
  }

  return (
    <div className="pt-2">
      <EventDetailsTable
        events={races}
      />
    </div>
  );
}

export default function DivisionResults (props: Props) {
  const columnHelper = createColumnHelper<{
    teamName: string,
    teamCode: string,
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
    columnHelper.accessor(
      row => {return {
        teamCode: row.teamCode,
        teamName: row.teamName
      }},
      {
        id: "teamName",
        header: 'Team',
        cell: info => { 
          const className = "pr-2";
          const value = info.getValue().teamName;
          
          const isFooterRow = info.getValue().teamCode.length === 0;

          return isFooterRow ? (
            <div 
              className={className}
            >
              {value}
            </div>
          ) : (
            <LinkWithQuery 
              to={`/nyrr-thing/team/${info.getValue().teamCode}`} 
              className={className}
            >
                { value } 
            </LinkWithQuery>
          )
        },
      }
    ), 
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
      teamCode: teamResult.teamCode,
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
      teamCode: '',
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
            (<LinkWithQuery to={`division/${props.divisionCode}`}>Show Details</LinkWithQuery>)
          : (<div/>)
        }
        noWrap={props.noWrap}
      />
      { getEventKeyComponents(races) }
    </div>
  );
}