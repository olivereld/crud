"use client";

import { useEffect, useState } from "react";
import DataCrudService from "@/service/dataCrud.service";
import Link from "next/link";
import { IProduct } from "@/models/product";

interface AppTableProps {
  headers: string[];
}

interface AppCreateFormProps {
  actualList: IProduct[];
  onAdd: (_newValue: IProduct) => void;
  onClose: () => void;
}

function AppCreateForm({
  onAdd,
  onClose,
  actualList,
}: AppCreateFormProps): JSX.Element {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [active, setActive] = useState(false);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newProduct = DataCrudService.createData(
      {
        name,
        description,
        price,
        active,
      },
      actualList
    );

    newProduct && onAdd(newProduct);

    setName("");
    setDescription("");
    setPrice("0");
    setActive(false);
    onClose();
  };
  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
          Price:
        </label>
        <input
          type="text"
          id="price"
          name="price"
          onChange={(e) => setPrice(e.target.value as string)}
          className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="active" className="block text-gray-700 font-bold mb-2">
          active:
        </label>
        <select
          id="active"
          name="active"
          onChange={(e) => setActive(e.target.value === "true")}
          className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

function AppTableComponent({ ...props }: AppTableProps) {
  const [dataTable, setDataTable] = useState<IProduct[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [parameter, setParameter] = useState<string>("");
  const { headers } = props;
  const toggleactive = (product: any) => {
    product.active = !product.active;
    const response = DataCrudService.editData(product.id, product);
    setDataTable(response);
  };
  const deleteElement = (product: IProduct) => {
    const updatedList = DataCrudService.deleteDataById(product?.id, dataTable);

    setDataTable(updatedList);
  };

  const createButton = () => {
    return (
      <button
        onClick={() => {
          setIsCreate(!isCreate);
        }}
        className=" bg-blue-500 mt-9 mb-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
    );
  };

  const searchParam = () => {
    return (
      <form action="">
        <div className="mb-4">
          <label htmlFor="param" className="block text-gray-700 font-bold mb-2">
            Search:
          </label>
          <input
            type="text"
            id="param"
            name="param"
            onChange={(e) => setParameter(e.target.value)}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </form>
    );
  };

  useEffect(() => {
    if (parameter) {
      return setDataTable(DataCrudService.getDataByParam(parameter));
    } else {
      return setDataTable(DataCrudService.getData());
    }
  }, [parameter]);

  return (
    <>
      <div className="w-full flex flex-row p-5 gap-5 justify-end">
        {createButton()}
        {searchParam()}
      </div>
      {isCreate ? (
        <AppCreateForm
          onAdd={(_newValue: IProduct) => {
            setDataTable((prevData) => [...prevData, _newValue]);
            setIsCreate(false);
          }}
          onClose={() => {
            setIsCreate(false);
          }}
          actualList={dataTable}
        />
      ) : (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              {headers.map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="mt-5">
            {dataTable.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.active ? "Active" : "Inactive"}</td>
                <td>
                  <div className="inline-flex">
                    <Link
                      href={"/" + product.id}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-2"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => toggleactive(product)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-2"
                    >
                      Edit active
                    </button>
                    <button
                      onClick={() => {
                        deleteElement(product);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r m-2"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AppTableComponent;
