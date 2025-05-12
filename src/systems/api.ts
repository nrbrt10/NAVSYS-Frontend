import axios from 'axios';

const ASTRA_ROOT_URL = 'http://127.0.0.1:8000'

export const fetchDXInstances = async () => {
    const response = await axios.get(`${ASTRA_ROOT_URL}/api/v1/dx_instances/`);
    return response.data;
}

export const fetchPointsOfInterest = async () => {
    const response = await axios.get(`${ASTRA_ROOT_URL}/api/v1/pois/`);
    return response.data;
}