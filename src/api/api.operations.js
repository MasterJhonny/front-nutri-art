import axios from "axios";
import { transformDate } from "../func";
import { config } from "../config.js";

const BASE_URL = `${config.API_URL}/operations`;

export const getOperationsByMaterialId = async (id) => {
    const rta = await axios.get(`${BASE_URL}/${id}`);
    const operations = rta.data.map(item=> {
        return {
            ...item,
            date: transformDate(item.date)
        }
    })
    return operations;
}

export const createdOperation = async (data) => {
    const rta = await axios.post(BASE_URL, data);
    return rta.data;
}

export const deletedOperation = async (id) => {
    const rta = await axios.delete(`${BASE_URL}/${id}`)
    return rta.data;
}
