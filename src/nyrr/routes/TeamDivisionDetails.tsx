import { useParams } from "react-router-dom";

type Props = {
  year: number,
};

export default function TeamDivisionDetails(props:Props) {
  const { teamCode, divisionCode } = useParams()

  return (
    <div>
      {teamCode}
      <br></br>
      {divisionCode}
    </div>
  );
}