// types.ts

export interface Product {
    [x: string]: any;
    id: number;
    name: string;
    description: string;
    supplier: string;
    category: string;
    stock: number;
    status: string;
    photo: string;
  }
  