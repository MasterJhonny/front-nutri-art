import axios from "axios";
import { transformDate } from '../func';
import { config } from "../config.js";

const BASE_URL = `${config.API_URL}/employes`;

export const getEmployes = async () => {
    const rta = await axios.get(BASE_URL);
    const customData = rta.data.map(item => {
        return {
            ...item,
            date: transformDate(item.created_at)
        }
    })
    console.log("🚀 ~ file: api.material.js:14 ~ customData ~ customData:", customData);
    return customData;
}

export const createdEmploye = async (data) => {
    const rta = await axios.post(BASE_URL, data);
    return rta.data;
}

export const deletedEmploye = async (id) => {
    const rta = await axios.delete(`${BASE_URL}/${id}`)
    return rta.data;
}
