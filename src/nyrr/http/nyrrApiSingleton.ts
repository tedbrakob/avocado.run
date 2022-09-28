import axios from "axios";
import NyrrApi from "nyrr-results-api";
import { z } from "zod";

export default class NyrrApiSingleton {
  private static instance: NyrrApi;

  public static async getInstance(): Promise<NyrrApi> {
      if (!NyrrApiSingleton.instance) {
          const token = await NyrrApiSingleton.getApiToken();
          NyrrApiSingleton.instance = new NyrrApi(token);
      }

      return NyrrApiSingleton.instance;
  }

  private static async getApiToken() : Promise<string>
  {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/nyrr-token');
    const data = response.data;

    z.object({
      'token': z.string(),
    }).parse(data);

    return data.token;
  }
}