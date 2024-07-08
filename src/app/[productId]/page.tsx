"use client";
import { useEffect, useState } from "react";
import DataCrudService from "@/service/dataCrud.service";
import Link from "next/link";

export default function DetailsIdPage({
  params,
}: {
  params: { productId: string };
}) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    setProduct(DataCrudService.getDataById(params.productId));
  }, []);

  return (
    <div className="flex flex-col justify-items-center w-full gap-5 p-5">
      {product ? (
        <a
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="flex justify-between w-full">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
            {product.status ? "Active" : "Inactive"}
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {product.description}
          </p>
          <div className="w-full justify-end flex font-normal text-gray-700 dark:text-gray-400">
            {product.price}
          </div>
          <Link
            href={"/"}
            className="w-50 bg-red-500 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Back
          </Link>
        </a>
      ) : (
        <div className="w-50 p-5 flex justify-start flex-col">
          Not Found
          <div className="col-2 mt-5">
            <Link
              href={"/"}
              className="w-50 bg-red-500 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
