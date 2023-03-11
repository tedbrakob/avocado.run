import { spotify as config } from "../../config/config";

export default function Login() {
  const randomHexChars = (length: number) => {
    var numberArray = new Uint8Array(length / 2)
    window.crypto.getRandomValues(numberArray)
    return Array.from(
      numberArray,
      (x) => x.toString(16).padStart(2, "0")
    ).join('');
  }

  const login = () => {
    const state = randomHexChars(16);
    localStorage.setItem('spotify-login-state', state);

    const scopes = [
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-private',
      'playlist-modify-public',
      'user-library-read'
    ];

    const url = new URL('https://accounts.spotify.com/authorize');
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', config.clientId);
    url.searchParams.set('scope', scopes.join(' '));
    url.searchParams.set('redirect_uri', config.redirectUri);
    url.searchParams.set('state', state);

    window.location.assign(url.href);
    window.open(url.href, "_top");
  }

  return (
    <div className="w-full">
      <div className="max-w-[50%] m-auto p-2">
        <div className="flex my-2">
          <h2 className="my-auto mr-auto text-xl font-bold">
            Spotify Thing
          </h2>
          <button
            className="bg-dark-accent text-light font-bold p-2 rounded-md"
            onClick={login}
          >Login with Spotify</button>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum lacinia ipsum, ut porttitor nunc interdum eu. Donec eu dictum lacus, pharetra dictum sapien. Aliquam hendrerit quam ut vestibulum ullamcorper. Aliquam risus libero, accumsan non vestibulum vel, suscipit vel massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ut dapibus mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

          Sed ut porta nibh. Nulla condimentum nunc ut turpis aliquet, a placerat ligula varius. Nunc sodales leo sollicitudin posuere facilisis. Vivamus non enim ac dolor consequat efficitur in ut ipsum. Proin pulvinar, enim et tempor volutpat, quam massa sagittis quam, eu volutpat velit sem non mi. Pellentesque maximus lacinia arcu et accumsan. Pellentesque eu consectetur turpis. Sed maximus eros turpis, nec efficitur magna facilisis ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean nisl ex, bibendum ac nibh et, finibus lobortis risus. In hac habitasse platea dictumst. Aenean consequat lacus eros, a finibus quam tincidunt non.

          Curabitur ligula dui, condimentum at leo id, lobortis vehicula lorem. Fusce euismod, ipsum pulvinar porta mollis, sem est placerat nisl, in faucibus libero lorem ut diam. Vestibulum maximus odio tellus, ut consectetur nunc pharetra sed. Mauris et tortor sed libero eleifend tempus et nec tortor. Nullam id hendrerit nunc. Sed at augue molestie, consequat nibh non, pulvinar felis. Maecenas sagittis et ligula nec fringilla. Aliquam auctor facilisis lectus non rutrum. Morbi pretium scelerisque blandit. Etiam dui lectus, eleifend non fermentum sed, mollis sed dui. Pellentesque mollis risus ac turpis facilisis ultrices. In non urna sit amet leo feugiat ultrices. Fusce eget sem odio. Mauris tempus arcu in nisi vehicula, nec fringilla felis sagittis. Duis eget orci a nulla convallis blandit.

          Mauris tortor quam, venenatis quis ullamcorper a, interdum at ipsum. Ut hendrerit ante mi, at convallis sem dignissim et. Suspendisse nec mauris rutrum, scelerisque nunc a, malesuada est. Nam tincidunt libero tellus, eget tristique felis semper sed. Duis pharetra quam condimentum metus mattis, ut rutrum augue volutpat. In mollis, odio eget gravida tempus, nunc enim volutpat nisi, quis pulvinar libero massa at quam. Nullam eleifend nunc et diam bibendum pretium. Curabitur ligula nibh, sodales vel consectetur id, feugiat id velit. Praesent elementum ex a sem cursus suscipit. Ut faucibus egestas dolor, in consequat risus vestibulum ac. Ut a urna ornare, pretium massa ut, maximus felis. Vivamus eros felis, gravida in placerat nec, interdum id tortor. Etiam eleifend posuere est quis malesuada. In non nisi pharetra, pharetra massa eget, convallis nisi. Phasellus elementum magna nec eros tristique, vel porttitor eros aliquet. Vivamus erat purus, hendrerit eu est sed, molestie tincidunt sem.

          Suspendisse est neque, varius vulputate nulla eu, varius gravida nisl. Donec gravida justo sit amet tempor tincidunt. Pellentesque et lobortis lectus. Proin non ligula at nulla sollicitudin cursus. Maecenas eu enim ante. Praesent accumsan eget magna sed commodo. Aenean malesuada purus a ligula cursus consectetur bibendum non augue. Donec tristique leo nec neque dapibus lacinia. Nulla sollicitudin dapibus tortor euismod facilisis. Nam et consequat mi. Phasellus suscipit eleifend risus, id vestibulum velit posuere ac.
        </p>
      </div>
    </div>
  );
}