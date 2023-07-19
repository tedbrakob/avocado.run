import { Playlist } from "@spotify/api/types/playlist";
import TargetPlaylistDropdown from "./TargetPlaylistDropdown";
import TargetPlaylist from "../builder/sources/targetPlaylist";

type Props = {
  targetPlaylist: TargetPlaylist | undefined,
  setTargetPlaylist: React.Dispatch<React.SetStateAction<TargetPlaylist | undefined>>,
  overwriteExistingPlaylist: boolean,
  setOverwriteExistingPlaylist: React.Dispatch<React.SetStateAction<boolean>>,
  ignoreDuplicates: boolean,
  setIgnoreDuplicates: React.Dispatch<React.SetStateAction<boolean>>,
  userPlaylists: Playlist[],
  userId: string,
};

export default function DashboardOptionsPanel (props: Props) {
  const {userPlaylists, ...dropdownProps} = props;

  const onRadioChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    switch (event.target.value) {
      case 'overwrite':
        props.setOverwriteExistingPlaylist(true);
        break;
      case 'append':
        props.setOverwriteExistingPlaylist(false);
        break;
    }
  }

  const targetPlaylistOptions = userPlaylists.filter((playlist) => 
    playlist.collaborative || playlist.owner.id === props.userId
  ).map((playlist) => {
    return new TargetPlaylist({id: playlist.id, name: playlist.name, creating: false});
  })

  const behaviorRadioGroupElement = !props.targetPlaylist?.creating ? (
    <div className="py-2">
      <div>
        <div
          className="flex"
        >
          <input
            type="radio"
            id="append-radio"
            value="append"
            name="existing-playlist-behavior"
            checked={!props.overwriteExistingPlaylist}
            onChange={onRadioChange}
          />
          <label
            className="ml-2"
            htmlFor="append-radio"
          >
            Append to existing playlist
          </label>
        </div>
        <div
          className="flex"
        >
          <input
            type="radio"
            id="overwrite-radio"
            value="overwrite"
            name="existing-playlist-behavior"
            checked={props.overwriteExistingPlaylist}
            onChange={onRadioChange}
          />
          <label
            className="ml-2"
            htmlFor="overwrite-radio"
          >
            Overwrite existing playlist
          </label>
        </div>
      </div>
    </div>
  ) : null;
  
  return (
    <div
      className="bg-light p-2 m-1"
    >
      <div className="text-l font-bold m-auto max-w-fit">
        Options
      </div>
      <div className="divide-y divide-dark-accent">
        <div
          className="flex py-2"
        >
          <label
            className="flex-none mt-2 mr-2"
            htmlFor="targetPlaylistDropdown"
          >
            Target Playlist
          </label>
          <TargetPlaylistDropdown
            {...dropdownProps}
            userPlaylists={targetPlaylistOptions}
            id="targetPlaylistDropdown"
          ></TargetPlaylistDropdown>
        </div>
        {behaviorRadioGroupElement}
        <div className="py-2">
          <input type="checkbox"
            onChange={(e) => props.setIgnoreDuplicates((e.target).checked)}
          ></input>
          <span className="pl-1">Without Duplicates</span>
        </div>
      </div>
    </div>
  );
}