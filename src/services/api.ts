import axios from "axios";
import { Person, Planet, SWAPIResponse, Vehicle, Starship } from "../types";

const BASE_URL = "https://swapi.dev/api";

// Generic function to fetch data from SWAPI
async function fetchData<T>(
  endpoint: string,
  page = 1
): Promise<SWAPIResponse<T>> {
  try {
    const response = await axios.get<SWAPIResponse<T>>(
      `${BASE_URL}/${endpoint}/?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// Function to fetch a specific entity by URL
async function fetchEntityByUrl<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching entity:`, error);
    throw error;
  }
}

// Functions for specific entity types
export const PeopleAPI = {
  getAll: (page = 1) => fetchData<Person>("people", page),
  getOne: (id: string) => fetchEntityByUrl<Person>(`${BASE_URL}/people/${id}/`),
  getByUrl: (url: string) => fetchEntityByUrl<Person>(url),
};

export const PlanetsAPI = {
  getAll: (page = 1) => fetchData<Planet>("planets", page),
  getOne: (id: string) =>
    fetchEntityByUrl<Planet>(`${BASE_URL}/planets/${id}/`),
  getByUrl: (url: string) => fetchEntityByUrl<Planet>(url),
};

export const VehiclesAPI = {
  getAll: (page = 1) => fetchData<Vehicle>("vehicles", page),
  getOne: (id: string) =>
    fetchEntityByUrl<Vehicle>(`${BASE_URL}/vehicles/${id}/`),
  getByUrl: (url: string) => fetchEntityByUrl<Vehicle>(url),
};

export const StarshipsAPI = {
  getAll: (page = 1) => fetchData<Starship>("starships", page),
  getOne: (id: string) =>
    fetchEntityByUrl<Starship>(`${BASE_URL}/starships/${id}/`),
  getByUrl: (url: string) => fetchEntityByUrl<Starship>(url),
};

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
