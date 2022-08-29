import { createColumnHelper } from "@tanstack/react-table";
import { TeamResults } from "../../http/nyrr";
import Table from "../Table";

type Props = {
  divisionName: string,
  divisionCode: string,
  divisionResults: TeamResults[],
  maxRows: number,
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

  const truncatedResults = divisionResults.slice(0, props.maxRows);

  if (divisionResults.length > props.maxRows) {
    truncatedResults.push({
      teamName: `${divisionResults.length - props.maxRows} more...`,
      teamPlace: '',
      totalPoints: '',
    })
  }

  return (
    <div>
      <div>{props.divisionName}</div>
      <Table
        data={truncatedResults}
        columns={columns}
      />
    </div>
  );
}