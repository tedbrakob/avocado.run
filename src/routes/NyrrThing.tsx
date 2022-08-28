import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../components/Table";
import { fetchClubStandings } from "../http/nyrr";

export default function NyrrThing () {
  const { data, error } = useQuery(['nyrr-fetchClubStandings'], fetchClubStandings);

  if (error) {
    console.log(error);
  }

  if (data === undefined) {
    return (
      <div className="w-full">
        <h2 className="w-40 mx-auto">NYRR Thing</h2>
      </div>
    );
  }

  type TableRow = {
    teamName: string,
    teamPlace: number,
    totalPoints: number,
  };

  const columnHelper = createColumnHelper<TableRow>();

  const columns = [
    columnHelper.accessor('teamPlace', {
      header: 'Place',
      cell: info => <div className="text-right mx">{info.getValue()}</div>,
    }),
    columnHelper.accessor('teamName', {
      header: 'Team',
      cell: info => <div className="pr-2"> { info.getValue() } </div>,
    }),
    columnHelper.accessor('totalPoints', {
      header: 'Points',
      cell: info => <div className="text-right">{info.getValue()}</div>,
    }),
  ];

  return (
    <div className="p-2 max-w-fit m-auto">
      <Table
        data={data}
        columns={columns}
      ></Table>
    </div>
  );
}