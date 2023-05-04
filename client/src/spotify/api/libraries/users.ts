import Profile from "../types/profile";
import ApiLibrary from "./apiLibrary";

class Users extends ApiLibrary {
  static #currentUsersProfile: Profile;

  getCurrentUsersProfile = async () => {
    if (Users.#currentUsersProfile === undefined) {
      Users.#currentUsersProfile = (await this.client.fetch('GET', 'me')).data;
    }
    return Users.#currentUsersProfile;
  }
}

export default Users;