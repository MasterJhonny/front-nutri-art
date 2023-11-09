import axios from "axios";
import { makePathForRouter } from "../func";
import { config } from "../config.js";

const BASE_URL = `${config.API_URL}/material`;

export const getMaterial = async () => {
  try {
    const rta = await axios.get(BASE_URL);
    const customData = rta.data.map((item) => {
      return {
        ...item,
        path: makePathForRouter(item.article),
      };
    });
    return customData;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};

export const createdMaterial = async (data) => {
  try {
    const rta = await axios.post(BASE_URL, data);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};

export const deletedMaterial = async (id) => {
  try {
    const rta = await axios.delete(`${BASE_URL}/${id}`);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};
