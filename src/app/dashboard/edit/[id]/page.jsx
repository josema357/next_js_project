"use client";

import FormProduct from "@/components/FormProduct";
import endPoints from "@/services/api/endPoints";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [product, setProduct]=useState({});

    useEffect(()=>{
        const id = params.id;
        async function getProduct(){
            const response = await axios.get(endPoints.products.getProduct(id));
            setProduct(response.data);
        }
        getProduct();
    },[params.id]);
  return (
    <FormProduct product={product}/>
  );
}
