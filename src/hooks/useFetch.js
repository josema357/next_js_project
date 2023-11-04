// eslint-disable-next-line semi
'use client'

import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Funcion para hacer peticiones
 * @param {String} endPoint url del endpoint para obtener los datos
 * @returns 
 */
const useFetch=(endPoint)=>{
    const [data, setData] = useState([]);
    async function fetchData(){
        const response= await axios.get(endPoint);
        setData(response.data);
    }
    useEffect(()=>{
        try {
            fetchData();
        } catch (error) {
            throw new Error("Sentry Frontend Error: useFetch.js");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[endPoint]);
    return data;
};

export default useFetch;