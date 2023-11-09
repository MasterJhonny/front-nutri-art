import axios from "axios";
import { config } from "../config.js";

const BASE_URL = `${config.API_URL}/summarycost`;

export const registerSummaryOperation = async (data) => {
  try {
    const rta = await axios.post(BASE_URL, data);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};