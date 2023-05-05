import loginUrl from "../lib/auth/loginUrl";

export default function Login() {
  return (
    <div className="w-full">
      <div className="max-w-[50%] m-auto p-2">
        <div className="flex my-2">
          <h2 className="my-auto mr-auto text-xl font-bold">
            Spotify Thing
          </h2>
          <button
            className="bg-dark-accent text-light font-bold p-2 rounded-md"
            onClick={loginUrl.redirect}
          >Login with Spotify</button>
        </div>
        <p>
          Use spotify-thing to build playlists of songs within a specified tempo range.
        </p>
        <br/>
        <p>
          Spotify has a low limit on how many users can access my app in in Dev mode, so I need to manually grant access to new users.  If you know me or want to hire me, get in contact and I'll get you access!
        </p>
      </div>
    </div>
  );
}