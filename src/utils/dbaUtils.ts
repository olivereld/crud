import { IProduct } from "@/models/product";

function getNewId(listaElementos: IProduct[]): number {
  const maxId = listaElementos.reduce(
    (maxElement: IProduct, element: IProduct) => {
      return (element.id as number) > (maxElement.id as number)
        ? element
        : maxElement;
    }
  );
  const newId = (maxId.id as number) + 1;
  return newId;
}

export default getNewId;
