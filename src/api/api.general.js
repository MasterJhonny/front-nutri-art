import axios from "axios";

export const getData = async (url) => {
  try {
    const rta = await axios.get(url);
    return rta.data;
  } catch (error) {
    console.error("Ups! Error!", error);
  }
};