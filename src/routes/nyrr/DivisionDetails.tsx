import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DivisionResults from "../../components/nyrr/DivisionResults";
import { fetchClubStandings } from "../../http/nyrr";
import getDivisionName from "../../nyrr/divisionNames";

export default function DivisionDetails() {
  const { divisionCode } = useParams()
  const { error, data } = useQuery(
    ['nyrr-fetchClubStandings', divisionCode], 
    () => fetchClubStandings(divisionCode ?? '')
  );

  if (error || !divisionCode) {
    console.log(error);
    return (<div>error</div >);
  }

  if (!data) {
    return <div>loading</div >
  }

  const divisionName = getDivisionName(divisionCode);

  return (
    <main style={{ padding: "1rem 0" }}>
      <DivisionResults
        divisionName={divisionName}
        divisionCode={divisionCode}
        divisionResults={data}
        showRaceResults={true}
        showDetailsLink={false}
      ></DivisionResults>
    </main>
  );
}