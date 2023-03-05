import { useParams } from "react-router-dom"

type Props = {
  
}

export default function Details(props: Props) {
  const { eventCode } = useParams()
  return <div>{eventCode}</div>
}