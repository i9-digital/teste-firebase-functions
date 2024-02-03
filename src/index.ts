import { onRequest } from 'firebase-functions/v2/https';
import { firestore } from 'firebase-functions/v1';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { FirestoreProductRepository } from './product/repository/firestore-product-repository';
import { CreateProductUsecase } from './product/usecase/create-product-usecase';
import { IncrementProductIdUsecase } from './product/usecase/increment-product-id-usecase';

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
const productRepository = new FirestoreProductRepository(db);
const createProductUsecase = new CreateProductUsecase(productRepository);
const incrementProductIdUsecase = new IncrementProductIdUsecase(productRepository);

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
  const data = snapshot.data();
  await incrementProductIdUsecase.execute({ id: snapshot.id, name: data.name });
});
