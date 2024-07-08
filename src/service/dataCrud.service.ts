import DataBase from "@/dba/data";
import { IProduct } from "@/models/product";
import getNewId from "@/utils/dbaUtils";
import getOrderAsc from "@/utils/orderingUtil";

class DataCrudService {
  public static getData(): IProduct[] {
    return getOrderAsc(DataBase as IProduct[]);
  }
  public static getDataByParam(param: string): IProduct[] {
    return DataBase.filter((p) =>
      p.name.toLocaleLowerCase().includes(param.toLocaleLowerCase())
    );
  }
  public static getDataById(id: string): IProduct | undefined {
    return DataBase.find((p) => p.id === parseInt(id, 10));
  }
  public static editData(id: string | number, data: IProduct) {
    const updateList = [
      ...DataBase.map((product) => {
        if (id == product.id) {
          return data;
        } else {
          return product;
        }
      }),
    ];
    return updateList as any[];
  }

  static createData(data: IProduct, actualList: IProduct[]): IProduct | null {
    if (data.name && data.description) {
      const new_id = getNewId(actualList);
      return { ...data, id: new_id };
    } else {
      return null;
    }
  }

  static deleteDataById(
    idToDelete: string | number | undefined,
    actualList: IProduct[]
  ) {
    if (idToDelete) {
      const updatedList = actualList.filter(
        (element) => element.id !== idToDelete
      );
      return updatedList;
    } else {
      return actualList;
    }
  }
}

export default DataCrudService;
