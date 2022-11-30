
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/Table";
import { TeamEventScorer } from "../types";

type Props = {
  scorers: TeamEventScorer[];
}

export default function TeamEventScorersTable(props: Props) {
  const columnHelper = createColumnHelper<{
    firstName: string,
    lastName: string,
    finishPlace: string,
    finishTime: string,
  }>();

  const columns = [
    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
      id: 'fullName',
      header: info => <div className="text-left">Name</div>,
    }),
    columnHelper.accessor('finishPlace', {
      header: info => <div className="text-right">Place</div>,
      cell: info => <div className="text-right mx">{info.getValue()}</div>,
    }),
    columnHelper.accessor('finishTime', {
      header: info => <div className="text-right">Time</div>,
      cell: info => <div className="text-right">{info.getValue()}</div>,
    })
  ];

  return (
    <div className="w-full mx-auto">
      <Table
        data={props.scorers}
        columns={columns}
        header=""
      />
    </div>
  );

}