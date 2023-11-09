import axios from "axios";
import { config } from "../config.js";

const BASE_URL = `${config.API_URL}/lotes`;

export const getData = async (url) => {
  try {
    const rta = await axios.get(url);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};

export const getSummariesLots = async () => {
  try {
    const url = `${BASE_URL}/summaries-set-lotes`
    const rta = await axios.get(url);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};

export const registerSummaryOperation = async (data) => {
  try {
    const url = `${config.API_URL}/summarycost`
    const rta = await axios.post(url);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};