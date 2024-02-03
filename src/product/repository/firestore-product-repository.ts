import { Firestore } from 'firebase-admin/firestore';
import { ProductRepository, ProductRepositoryListFilter } from './product-repository';
import { Product } from '../entity/product';
import { UniqueId } from '../../@shared/value-object/unique-id';

export class FirestoreProductRepository implements ProductRepository {
  constructor(private readonly db: Firestore) {}

  async create(product: Product): Promise<void> {
    await this.db.collection('product').doc(product.id.value).set({ incrementedId: null, name: product.name });
  }

  async update(product: Product): Promise<void> {
    await this.db.collection('product').doc(product.id.value).set(
      {
        name: product.name,
        incrementedId: product.incrementedId,
      },
      { merge: true },
    );
  }

  async list(filter?: Partial<ProductRepositoryListFilter>): Promise<Product[]> {
    const defaultFilter: ProductRepositoryListFilter = {
      limit: Number.MAX_SAFE_INTEGER,
      orderBy: { field: 'incrementedId', direction: 'asc' },
    };
    Object.assign(defaultFilter, filter);
    const querySnapshot = await this.db
      .collection('product')
      .orderBy(defaultFilter.orderBy?.field, defaultFilter.orderBy?.direction)
      .limit(defaultFilter.limit)
      .get();
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const product = new Product(new UniqueId(doc.id), data.name);
      product.updateIncrementedId(data.incrementedId);
      return product;
    });
  }
}
