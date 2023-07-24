import TextInput from "@src/components/TextInput"

type Props = {
  params: TempoParams,
  setParams: (params: TempoParams) => void,
}

export type TempoParams = {
  minTempo: string,
  maxTempo: string,
};

export default function Tempo (props: Props) {
  const params = props.params;

  function setParam(paramName: string, paramValue: string) {
    const minTempo = paramName === 'minTempo' ? paramValue : params.minTempo;
    const maxTempo = paramName === 'maxTempo' ? paramValue : params.maxTempo;

    props.setParams({
      minTempo,
      maxTempo,
    });
  }

  return (
    <div>
      <div
        className="flex"
      >
        <div
          className="mt-2 mr-2 ml-2"
        >Tempo:</div>
        <TextInput
          value={params.minTempo}
          type="number"
          onChange={(event) => { setParam('minTempo', event.target.value) }}
        />
        <div
          className="mt-2 mr-2 ml-2"
        >to</div>
        <TextInput
          value={params.maxTempo}
          type="number"
          onChange={(event) => { setParam('maxTempo', event.target.value) }}
        />
        <div
          className="mt-2 mr-2 ml-2"
        >(BPM)</div>
      </div>
    </div>
  );
}