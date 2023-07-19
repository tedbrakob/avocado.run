import { useRef, useState } from "react";
import TargetPlaylist from "../builder/sources/targetPlaylist";
import TextInput from "@src/components/TextInput";
import { twMerge } from "tailwind-merge";

type Props = {
  targetPlaylist: TargetPlaylist | undefined,
  setTargetPlaylist: React.Dispatch<React.SetStateAction<TargetPlaylist | undefined>>,
  userPlaylists: TargetPlaylist[],
  id: string,
}

export default function TargetPlaylistDropdown(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLUListElement>(null);

  const open = () => {
    setSelectedIndex(0);
    setIsOpen(true);
  }
  const closeAfterDelay = () => setTimeout(() => close(), 150);
  const close = () => setIsOpen(false);

  const optionSelected = (playlist: TargetPlaylist) => {
    props.setTargetPlaylist(playlist);
    setTimeout(() => {
      close();
      setSearchText('');
    }, 150);
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        setSelectedIndex(Math.min(list.length - 1, selectedIndex + 1));
        scrollToActive();
        break;
      case 'ArrowUp':
        setSelectedIndex(Math.max(0, selectedIndex - 1));
        scrollToActive();
        break;
      case 'Enter':
        optionSelected(list[selectedIndex]);
        break;
      default:
        setSelectedIndex(0);
        break;
    }
  }

  function scrollToActive() {
    const selected = selectRef?.current?.querySelector(`:nth-child(${selectedIndex + 4})`);
    if (selected) {
      selected?.scrollIntoView({
        block: "end"
      });
    }
  }

  const list = props.userPlaylists.filter(
    (option) => option.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (searchText.length > 0) {
    list.unshift(new TargetPlaylist({
      name: searchText,
      id: '',
      creating: true,
    }));
  }
  
  const dropdownList = isOpen ? (
    <ul 
      className="bg-dark-accent rounded-b-md absolute inline-block w-60 max-h-36 overflow-y-scroll"
      ref={selectRef}
    >
      {list.map((option, i) => {
        return (
          <li
            key={option.id}
            className={
              "border border-dark-accent text-center rounded-sm bg-white"}
          >
            <button
              className={
                twMerge(
                  "text-ellipsis whitespace-nowrap overflow-hidden w-full",
                  ((i === selectedIndex) ? "bg-primary" : ""),
                  (option.creating && i === selectedIndex ? "bg-green-700 text-light" : "")
                )
              }
              onMouseDown={() => optionSelected(option)}
            >
              {(option.creating ? '+' : '') + option.name}</button>
          </li>
        );
      }
      )}
    </ul>
  ) : null;

  const badge = props.targetPlaylist !== undefined && !isOpen ? (
    <div
      className={(props.targetPlaylist.creating ? "bg-green-700 text-light" : "bg-primary") + " absolute rounded-xl h-6 p-1 top-4 translate-y-[-50%] left-0.5 text-ellipsis whitespace-nowrap overflow-hidden max-w-[14rem]"}
      onClick={open}
    >{props.targetPlaylist.name}</div>
  ) : null;

  return (
    <div
      onFocus={open}
      onBlur={closeAfterDelay}
    >
      <div className="relative">
        {badge}
        <TextInput
          id="targetPlaylistDropdown"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onKeyDown={onKeyDown}
          className="w-60 mx-0"
        ></TextInput>
      </div>
      {dropdownList}
    </div>
  );
}