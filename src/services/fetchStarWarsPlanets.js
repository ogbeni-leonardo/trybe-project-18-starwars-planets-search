export default async () => {
  const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
  try {
    const response = await fetch(ENDPOINT);
    return response.json();
  } catch {
    return {};
  }
};
