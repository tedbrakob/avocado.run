import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DivisionResults from "../../components/nyrr/DivisionResults";
import { fetchClubStandings } from "../../http/nyrr";
import getDivisionName from "../../nyrr/divisionNames";

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
    return <div>loading</div >
  }

  const divisionName = getDivisionName(divisionCode);

  return (
    <div style={{ padding: "1rem 0" }}>
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