import axios from "axios";
import { transformDate } from "../func";
import { config } from "../config.js";

const BASE_URL = `${config.API_URL}/employes`;

export const getEmployes = async () => {
  try {
    const rta = await axios.get(BASE_URL);
    const customData = rta.data.map((item) => {
      return {
        ...item,
        date: transformDate(item.created_at),
      };
    });
    console.log(
      "🚀 ~ file: api.material.js:14 ~ customData ~ customData:",
      customData
    );
    return customData;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};

export const createdEmploye = async (data) => {
  try {
    const rta = await axios.post(BASE_URL, data);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};

export const deletedEmploye = async (id) => {
  try {
    const rta = await axios.delete(`${BASE_URL}/${id}`);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};
