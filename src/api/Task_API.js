import axios from "axios";
import { DEFAULT_URL, TASK_URL, AUTH_URL } from "./Default";

export const GetAllTasks = async () => {
    const response = await axios.get(DEFAULT_URL + TASK_URL);
    return response.data;
};
export const GetAllCompletedTasks = async (token) => {
    const response = await axios.get(DEFAULT_URL + TASK_URL + "completed", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const GetActiveTasks = async (token) => {
    const response = await axios.get(DEFAULT_URL + TASK_URL + "active", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const GetTask = async (id) => {
    return await axios.get(DEFAULT_URL + TASK_URL + id);
};

export const PostTask = async (data) => {
    return await axios.post(DEFAULT_URL + TASK_URL, data);
};

export const PatchTask = async (id, data) => {
    return await axios.patch(DEFAULT_URL + TASK_URL + id, data);
};

export const DeleteTask = async (id) => {
    return await axios.delete(DEFAULT_URL + TASK_URL + id);
};
