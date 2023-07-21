import TextInput from "@src/components/TextInput"

type Props = {
  minTempo: string,
  maxTempo: string,
  setMinTempo: React.Dispatch<React.SetStateAction<string>>,
  setMaxTempo: React.Dispatch<React.SetStateAction<string>>,
};

export default function Tempo(props: Props) {
  return (
    <div>
      <div
        className="flex"
      >
        <div
          className="mt-2 mr-2 ml-2"
        >Tempo:</div>
        <TextInput
          value={props.minTempo}
          type="number"
          onChange={(event) => { props.setMinTempo(event.target.value) }}
        />
        <div
          className="mt-2 mr-2 ml-2"
        >to</div>
        <TextInput
          value={props.maxTempo}
          type="number"
          onChange={(event) => { props.setMaxTempo(event.target.value) }}
        />
        <div
          className="mt-2 mr-2 ml-2"
        >(BPM)</div>
      </div>
    </div>
  );
}