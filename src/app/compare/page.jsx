"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const setNewProducts = () => {
      let products = searchParams.get("ids");
      if (products) {
        let productsList = products
          .split(",")
          .map((x) => parseInt(x))
          .filter((x) => !isNaN(x));
        if (productsList.length > 3) {
          toast.error("Cannot compare more than 3 products");
          return router.push("/allProducts");
        }
        if (productsList.length < 2) {
          toast.error("Add atleast 2 products to compare");
          return router.push("/allProducts");
        }
        setProducts(productsList);
      }
    };
    setNewProducts();
  }, [searchParams]);

  console.log(products);
  return (
    <div className="flex flex-col px-16 gap-3 bg-[#F7F7F5] mt-[5.5rem] ">
      <div className="border-b border-solid border-[#D3C6BB] flex flex-row pb-3">
        <div className="flex justify-center grow heading1 items-center uppercase font-[Satoru] cursor-default">
          Product Comparison
        </div>
        <div className="flex basis-1">
          <button className="uppercase text-sm font-normal shadow-md border-2 border-black w-44 py-2 px-4">
            Edit Selection
          </button>
        </div>
      </div>
      <div>
        <div>
          <span className="text-sm font-normal ">Product Type</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
