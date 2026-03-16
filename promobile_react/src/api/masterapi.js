import axios from "axios";
import { BASE_URL } from "../constant";

export const getRoles = async () => {
  const res = await axios.get(`${BASE_URL}/master/roles`);
  return res.data.data;
};

export const getCountries = async () => {
  const res = await axios.get(`${BASE_URL}/master/countries`);
  return res.data.data;
};

export const getStates = async (countryId) => {
  const res = await axios.get(
    `${BASE_URL}/master/states?countryId=${countryId}`
  );
  return res.data.data;
};

export const addUser = async (payload) => {
  const res = await axios.post(`${BASE_URL}/users/add`,payload);
  return res.data;
};

export const editUser = async (id,payload) => {
  const res = await axios.post(`${BASE_URL}/users/edit`,{ id, ...payload });
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${BASE_URL}/users/${id}`);
  return res.data;
};

export const getTable = async (payload) => {
  const res = await axios.post(`${BASE_URL}/users/list`, payload);
  return res.data;
};

export const updateStatus = async (payload) => {
  const res = await axios.post(`${BASE_URL}/users/update-status`,payload);
  return res.data;
};

export const userDelete = async (id) =>{
    const res = await axios.delete(`${BASE_URL}/users/${id}`);
}