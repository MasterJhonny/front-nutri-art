import axios from "axios";
import { makePathForRouter } from '../func';
import { config } from "../config.js";

const BASE_URL = `${config.API_URL}/material`;

export const getMaterial = async () => {
    const rta = await axios.get(BASE_URL);
    const customData = rta.data.map(item => {
        return {
            ...item,
            path: makePathForRouter(item.article)
        }
    })
    console.log("🚀 ~ file: api.material.js:14 ~ customData ~ customData:", customData);
    return customData;
}

export const createdMaterial = async (data) => {
    const rta = await axios.post(BASE_URL, data);
    return rta.data;
}

export const deletedMaterial = async (id) => {
    const rta = await axios.delete(`${BASE_URL}/${id}`)
    return rta.data;
}
