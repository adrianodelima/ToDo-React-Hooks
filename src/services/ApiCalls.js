import axios from "axios"

const API_LOCALHOST_URL = "http://localhost:4040";

export const fetchTaskList = async () => {
    try {
        const response = await axios({
            baseURL: API_LOCALHOST_URL,
            url: "/tarefas/",
            method: "GET",
        })

        return response.data;
    } catch (error) {
        throw error;
    }
};
