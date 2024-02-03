import { onRequest } from 'firebase-functions/v2/https';
import { firestore } from 'firebase-functions/v1';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Product } from './product/entity/product';
import { FirestoreProductRepository } from './product/repository/firestore-product-repository';
import { UniqueId } from './@shared/value-object/unique-id';
import { CreateProductUsecase } from './product/usecase/create-product-usecase';

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
const productRepository = new FirestoreProductRepository(db);
const createProductUsecase = new CreateProductUsecase(productRepository);

async function getNextIncrementedId(): Promise<number> {
  const products = await productRepository.list({ limit: 1, orderBy: { field: 'incrementedId', direction: 'desc' } });
  if (products.length === 0) return 1;
  const [lastProduct] = products;
  if (!lastProduct.incrementedId) return 1;
  return lastProduct.incrementedId + 1;
}

export const create = onRequest(async (request, response) => {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'method not allowed' });
    return;
  }
  if (!request.body?.name) {
    response.status(400).json({ error: '"name" is required' });
    return;
  }
  const productDto = await createProductUsecase.execute({ name: request.body.name });
  response.json(productDto);
});

export const update = firestore.document('product/{productId}').onCreate(async (snapshot) => {
  const nextId = await getNextIncrementedId();
  const data = snapshot.data();
  const product = new Product(new UniqueId(snapshot.id), data.name);
  product.updateIncrementedId(nextId);
  await productRepository.update(product);
});
