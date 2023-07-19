import ErrorScreen from "@components/ErrorScreen";
import TextInput from "@src/components/TextInput";
import Button from "@src/components/Button";
import useViewModel from "./viewModel";
import DashboardOptionsPanel from "@src/spotify/components/DashboardOptionsPanel";

export default function Dashboard() {
  const {
    optionsPanelProps,
    userPlaylists,
    userProfile,
    minTempo, setMinTempo,
    maxTempo, setMaxTempo,
    sourceCheckboxToggled,
    submit,
  } = useViewModel();

  if (!userPlaylists || !userProfile) {
    return (
      <ErrorScreen
        message="loading"
      ></ErrorScreen>
    );
  }

  return (
    <div>
      <div className="bg-primary">
        <div className="text-xl font-bold m-auto max-w-fit py-2">
          Create A Playlist
        </div>
      </div>
      <div
        className="w-1/3 m-auto bg-dark-accent p-1 mt-1"
      >
        <div className="text-center bg-light p-2 m-1">
          <Button
            value="Submit"
            onClick={submit}
            className="w-1/2"
          ></Button>  
        </div>
        <DashboardOptionsPanel
          {...optionsPanelProps}
          userPlaylists={userPlaylists}
          userId={userProfile.id}
        />
        <div
          className="bg-light p-2 m-1"
        >
          <div className="text-l font-bold m-auto max-w-fit">
            Filters
          </div>

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
              value={minTempo}
              type="number"
              onChange={(event) => { setMinTempo(event.target.value) }}
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
              value={maxTempo}
              onChange={(event) => { setMaxTempo(event.target.value) }}
            />
          </div>
        </div>
        <div
          className="bg-light p-2 m-1"
        >
          <div className="text-l font-bold m-auto max-w-fit">
            Sources
          </div>
          <ul>
            {
              userPlaylists.map((playlist) => (
                <li
                  key={playlist.id}
                >
                  <input type="checkbox"
                    onChange={(e) => sourceCheckboxToggled((e.target).checked, playlist)}
                  ></input>
                  <span className="pl-1">{playlist.name}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}