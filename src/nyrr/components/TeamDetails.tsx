import { useParams } from "react-router-dom";

type Props = {
  // year: number,
};

export default function TeamDetails(props: Props) {
  const { teamCode } = useParams()

  return (
    <div style={{ padding: "1rem 0" }}>
      {teamCode}
    </div>
  );
}