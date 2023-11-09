// eslint-disable-next-line semi
"use client";

import { ChartJS } from "@/common/Chart";
import { useAuth } from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import endPoints from "@/services/api/endPoints";

const PRODUCT_LIMIT = 5;
const PRODUCT_OFFSET = 0;

export default function Dashboard() {
  const auth = useAuth();
  auth.setOffSet(PRODUCT_OFFSET);
  const products = useFetch(
    endPoints.products.getProducts(PRODUCT_LIMIT, auth.offSet)
  );
  const categoryNames= products?.map((product)=>product.category.name);
  //const categoryCount=products?.map((category)=>category.category);
  
  const countOccurrences = (arr) => arr.reduce((prev, curr)=> ((prev[curr] = ++prev[curr] || 1), prev),{});

  const data = {
    datasets: [
      {
        label: "Categories",
        data: countOccurrences(categoryNames),
        borderWidth: 2,
        backgroundColor: ["#0093E9", "#FF0000", "#58af95","#2BFF88", "#F7CE68"],
      },
    ],
  };

  return (
    <>
      <ChartJS className="mb-8 mt-2" chartData={data} />
    </>
  );
}
