import axios from "axios";
import { config } from "../config.js";
import { transformDate } from "../func";

const BASE_URL = `${config.API_URL}/sales`;

export const getSales = async () => {
  try {
    const rta = await axios.get(BASE_URL);
    const customData = rta.data.map((item) => {
      return {
        ...item,
        date: transformDate(item.created_at),
      };
    });
    return customData;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};

export const registerSaleAndOperationOut = async (data) => {
  try {
    const rta = await axios.post(BASE_URL, data);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};

export const updatedSale = async (id, data) => {
  try {
    const rta = await axios.patch(`${BASE_URL}/${id}`, data);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};
