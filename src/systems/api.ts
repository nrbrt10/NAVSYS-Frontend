import axios from 'axios';

const rootURL = import.meta.env.VITE_BACKEND_ROOT || 'http://127.0.0.1:8000';

export const fetchRoot = async () => {
    const response = await axios.get(`${rootURL}`);
    return response.data;
}

export const fetchDXInstances = async () => {
    const response = await axios.get(`${rootURL}api/v1/dx_instances/`);
    return response.data;
}

export const fetchPointsOfInterest = async () => {
    const response = await axios.get(`${rootURL}api/v1/pois/`);
    return response.data;
}

export const fetchLatestGrids = async () => {
    const response = await axios.get(`${rootURL}api/v1/grid_positions/latest/`);
    return response.data
}