import axios from "axios";

export const marvelService = {
  _apiBasicURL: "",
  _apiKey: "apikey=9e10307b9422189c1aad1fae5ac11329",

  getCharactersForRandom() {
    const url = `https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=9e10307b9422189c1aad1fae5ac11329`;
    const data = axios.get(url).then((resp) => {
      return resp.data;
    });
    return data;
  },

  getCharacterById(id: number) {
    const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=9e10307b9422189c1aad1fae5ac11329`;
    const data = axios.get(url).then((resp) => {
      return resp.data;
    });
    return data;
  },

  getCharactersListWithLimitAndOffset(offset: number, limit: number) {
    const url = `https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&offset=${offset}&apikey=9e10307b9422189c1aad1fae5ac11329`;
    const data = axios.get(url).then((resp) => {
      return resp.data;
    });
    return data;
  },
};
