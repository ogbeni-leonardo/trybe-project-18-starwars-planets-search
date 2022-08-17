import fetchStarWarsPlanets from '../services/fetchStarWarsPlanets';
import planetsMock from './mocks/planetsMock';

describe('Teste da função "fetchStarWarsPlanets"', () => {
  const URL_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

  it('Verifica se a função é chamada com o endpoint correto', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsMock),
    });

    const response = await fetchStarWarsPlanets();

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(URL_API);
    expect(response).toEqual(planetsMock);
  });

  it('Verifica se um objeto vazio é retornado se houver uma falha na requisição', async () => {
    global.fetch = jest.fn(async () => Promise.reject());
    const response = await fetchStarWarsPlanets();
  
    expect(response).toEqual({});
  });
});