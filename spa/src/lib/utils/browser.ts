import { browser } from "$app/environment";

export const getApiUrl = () => browser 
    ? "http://localhost:5173" 
    : "http://localhost:8000"