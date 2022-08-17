export default async () => {
  const URL_API = 'https://swapi-trybe.herokuapp.com/api/planets/';
  try {
    const response = await fetch(URL_API); return response.json();
  } catch { return {}; }
};
