import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../components/LoadingScreen";
import { fetchTeams } from "../../http/nyrr";
import { FormEvent, useState } from "react";
import { LinkWithQuery } from "../../../components/LinkWithQuery";

type Props = {
  year: number,
}

export default function Index(props: Props) {
  const [searchText, setSearchText] = useState('');

  const onSearchTextChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const teamsQuery = useQuery(
    ['nyrr-all-teams', props.year],
    () => fetchTeams(props.year) 
  );

  if (teamsQuery.error) {
    console.log(teamsQuery.error);
  }

  if (teamsQuery.isLoading || teamsQuery.data === undefined) {
    return (
      <LoadingScreen/>
    );
  }

  const filteredTeams = teamsQuery.data.filter(team =>
    team.teamCode.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 
    || team.teamName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  return (
    <div className="p-4 m-auto 
      w-full
      sm:w-3/4
      md:w-1/2
      xl:min-w-1/3 xl:w-fit
    ">
        <input
          className="w-full my-2 p-4 rounded-md border border-dark"
          placeholder="Search..."
          value={searchText}
          onChange={onSearchTextChange}
        ></input>
        <ul>
          {
            filteredTeams.map(team =>
              (
                <li
                  className="mx-2 bg-white rounded-md border-b border-dark-accent"
                  key={team.teamCode}
                >
                    <LinkWithQuery
                      to={`/nyrr-thing/teams/${team.teamCode}`}
                      className="block mt-2 p-4"
                    >
                      {team.teamName}
                    </LinkWithQuery>
                </li>
              )
            )
          }
        </ul>
    </div>
  );
}