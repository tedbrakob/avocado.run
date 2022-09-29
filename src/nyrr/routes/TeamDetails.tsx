import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import Table from "../../components/Table";
import EventDetailsTable from "../components/EventDetailsTable";
import getDivisionName from "../divisionNames";
import { fetchDetailedResults } from "../models/TeamDetails";
import { EventDetails } from "../types";

type Props = {
  year: number,
};

export default function TeamDetails(props: Props) {
  const { teamCode } = useParams()

  const { error, data, isLoading } = useQuery(
    ['nyrr-fetchTeamDetailedResults', props.year, teamCode],
    () => fetchDetailedResults(props.year, teamCode ?? ""),
    {
      enabled: !!teamCode,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  if (error) {
    console.log(error);
    return (
      <div className="w-full whitespace-nowrap">
        <h2 className="w-40 mx-auto">Error</h2>
      </div>
    );
  }

  if (isLoading || data === undefined) {
    return (
      <div className="w-full">
        <h2 className="w-40 mx-auto">Loading...</h2>
      </div>
    );
  }

  const { teamName, events, divisionsResults } = data;

  const columnHelper = createColumnHelper<{
    divisionName: string,
    divisionPlace: string,
    totalPoints: string,
    races: number[],
  }>();

  const columns = [
    columnHelper.accessor('divisionName', {
      header: "Division",
    }),
    columnHelper.accessor('divisionPlace', {
      header: "Place",
      cell: info => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor('totalPoints', {
      header: "Points",
      cell: info => <div className="text-right">{info.getValue()}</div>,
    }),
    ...events.map((race:EventDetails, index:number) =>
      columnHelper.accessor(
        row => row.races[index] ?? '-',
        {
          id: race.eventCode,
          header: `${new Date(race.startDateTime).getMonth() + 1}/${new Date(race.startDateTime).getDate()}`,
          cell: info => <div className="text-right">{info.getValue()}</div>,
        }
      )
    ),
  ];

  const tableData = divisionsResults.map(divisionResult => {
    return {
      divisionName: getDivisionName(divisionResult.divisionCode),
      divisionPlace: divisionResult.place,
      totalPoints: divisionResult.points,
      races: divisionResult.eventsPoints, 
    }
  });

  return (
    <div className="w-full mx-auto">
      <Table
        data={tableData}
        columns={columns}
        header={teamName}
      />
      <div className="pt-2">
        <EventDetailsTable
          events={events}
        />
      </div>
    </div>
  );
}