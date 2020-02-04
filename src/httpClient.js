import axios from "axios";

const client_id = "11fc79dfbf3c471ab3ec79a9dc45e52a";
const client_secret = "44220d1d53fd4dbb86a9f3b5412e8620";

const Authorization = `${client_id}:${client_secret}`;

/**
 * Auto instance
 */
const auth = axios.create({
  baseURL: "https://accounts.spotify.com/api/",
  timeout: 1000
});

/**
 * Spotify instance
 * Strip away client id and secret
 */
const spotify = axios.create({
  baseURL: "https://api.spotify.com/v1",
  timeout: 1000,
  headers: {
    Authorization: "Basic " + Authorization,
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

var formEncoded = `client_id=${client_id}`;
formEncoded = formEncoded.concat(`&client_secret=${client_secret}`);
formEncoded = formEncoded.concat("&grant_type=client_credentials");
formEncoded = formEncoded.concat(
  "&Content-Type=application/x-www-form-urlencoded"
);

/**
 * This function fetches data from the spotify api
 * Try out some endpoints and see what you get!
 *
 * NOTE: you will need to add ids for most endpoints
 */
export const httpClient = async endpoint => {
  const response = await auth.post("token", formEncoded);
  const token = response.data.access_token;

  // maybe strip away token?
  return spotify.get(endpoint, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
};
