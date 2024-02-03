import { Product } from '../entity/product';

export interface ProductRepositoryListFilter {
  limit: number;
  orderBy: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

export interface ProductRepository {
  create(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  list(filter?: ProductRepositoryListFilter): Promise<Product[]>;
}
