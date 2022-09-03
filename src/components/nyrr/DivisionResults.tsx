import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { TeamResults } from "../../http/nyrr";
import getDivisionName from "../../nyrr/divisionNames";
import Table from "../Table";

type Props = {
  divisionName: string,
  divisionCode: string,
  divisionResults: TeamResults[],
  maxRows?: number,
  showRaceResults: boolean,
  showDetailsLink: boolean,
};

export default function DivisionResults (props: Props) {
  const columnHelper = createColumnHelper<{
    teamName: string,
    teamPlace: string,
    totalPoints: string,
  }>();

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
  ];

  const divisionResults = props.divisionResults.map(teamResult => {
    return {
      teamName: teamResult.teamName,
      teamPlace: teamResult.teamPlace.toString(),
      totalPoints: teamResult.totalPoints.toString(),
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
    })
  }

  return (
    <div className=" mx-auto">
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