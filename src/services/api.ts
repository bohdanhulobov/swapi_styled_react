import axios from "axios";
import { Person, Planet, SWAPIResponse, Vehicle, Starship } from "../types";

const BASE_URL = "https://swapi.dev/api";

async function fetchData<T>(
  endpoint: string,
  page = 1,
): Promise<SWAPIResponse<T>> {
  try {
    const response = await axios.get<SWAPIResponse<T>>(
      `${BASE_URL}/${endpoint}/?page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

async function fetchEntityByUrl<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching entity:`, error);
    throw error;
  }
}

function createAPI<T>(endpoint: string) {
  return {
    getAll: (page = 1) => fetchData<T>(endpoint, page),
    getOne: (id: string) =>
      fetchEntityByUrl<T>(`${BASE_URL}/${endpoint}/${id}/`),
    getByUrl: (url: string) => fetchEntityByUrl<T>(url),
  };
}

export const PeopleAPI = createAPI<Person>("people");
export const PlanetsAPI = createAPI<Planet>("planets");
export const VehiclesAPI = createAPI<Vehicle>("vehicles");
export const StarshipsAPI = createAPI<Starship>("starships");

export const TransportAPI = {
  getAll: async (page = 1) => {
    const vehicles = await VehiclesAPI.getAll(page);
    const starships = await StarshipsAPI.getAll(page);

    return {
      count: vehicles.count + starships.count,
      next: vehicles.next || starships.next,
      previous: vehicles.previous || starships.previous,
      results: [...vehicles.results, ...starships.results],
    };
  },
};
