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
        <label
          className="flex-none mt-2 mr-2"
          htmlFor="newPlaylistNameInput"
        >
          Min Tempo (BPM)
        </label>
        <TextInput
          id="newPlaylistNameInput"
          value={props.minTempo}
          type="number"
          onChange={(event) => { props.setMinTempo(event.target.value) }}
        />
      </div>

      <div
        className="flex"
      >
        <label
          className="flex-none mt-2 mr-2"
          htmlFor="newPlaylistNameInput"
        >
          Max Tempo (BPM)
        </label>
        <TextInput
          id="newPlaylistNameInput"
          type="number"
          value={props.maxTempo}
          onChange={(event) => { props.setMaxTempo(event.target.value) }}
        />
      </div>
    </div>
  );
}