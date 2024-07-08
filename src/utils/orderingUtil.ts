import { IProduct } from "@/models/product";

function getOrderAsc(listaElementos: IProduct[]): IProduct[] {
  return listaElementos.sort(
    (a: IProduct, b: IProduct) => (b.price as number) - (a.price as number)
  );
}

export default getOrderAsc;
