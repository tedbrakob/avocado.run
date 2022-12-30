import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/Table";
import { EventDetails } from "../types";

type Props = {
  events: EventDetails[],
}

export default function EventDetailsTable(props: Props) {

  const columnHelper = createColumnHelper<{
    startDateTime: string,
    eventName: string,
    distanceName: string,
  }>();

  const columns = [
    columnHelper.accessor('startDateTime', {
      header: "Date",
      cell: info => <div className="text-right">
          {new Date(info.getValue()).getMonth() + 1 + '/' + new Date(info.getValue()).getDate()}
        </div>,
    }),
    columnHelper.accessor('eventName', {
      header: "Name"
    }),
    columnHelper.accessor('distanceName', {
      header: "Distance"
    }),
  ];

  return (
    <div className="w-full mx-auto">
      <Table
        data={props.events}
        columns={columns}
        header={"Event Key"}
      />
    </div>
  );
}