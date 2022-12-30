import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DivisionResults from "../components/DivisionResults";
import LoadingScreen from "../components/LoadingScreen";
import { fetchClubStandings } from "../http/nyrr";
import { getDivisionName } from "../models/Division";

type Props = {
  year: number,
};

export default function DivisionDetails(props: Props) {
  const { divisionCode } = useParams()
  const { error, data } = useQuery(
    ['nyrr-fetchClubStandings', divisionCode, props.year], 
    () => fetchClubStandings(
      divisionCode ?? '',
      props.year
    ),
  );

  if (error || !divisionCode) {
    console.log(error);
    return (<div>error</div >);
  }

  if (!data) {
    return <LoadingScreen/>
  }

  const divisionName = getDivisionName(divisionCode);

  return (
    <div 
      className="m-auto max-w-fit py-4"
    >
      <DivisionResults
        divisionName={divisionName}
        divisionCode={divisionCode}
        divisionResults={data}
        showDetailsLink={false}
        noWrap
      ></DivisionResults>
    </div>
  );
}