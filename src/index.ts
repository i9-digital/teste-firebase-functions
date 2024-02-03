import { onRequest } from 'firebase-functions/v2/https';
import { firestore } from 'firebase-functions/v1';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Product } from './product/product';

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

async function getNextIncrementedId(): Promise<number> {
  const querySnapshot = await db.collection('product').orderBy('incrementedId', 'desc').limit(1).get();
  if (querySnapshot.empty) return 1;
  const [lastRecord] = querySnapshot.docs;
  return lastRecord.data().incrementedId + 1;
}

export const create = onRequest(async (request, response) => {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'method not allowed' });
    return;
  }
  if (!request.body.name) {
    response.status(400).json({ error: '"name" is required' });
    return;
  }
  const product = new Product(request.body.name);
  await db.collection('product').add({
    name: product.name,
    incrementedId: product.incrementedId,
  });
  response.json({
    incrementedId: product.incrementedId,
    name: product.name,
  });
});

export const update = firestore.document('product/{productId}').onCreate(async (snapshot) => {
  const nextId = await getNextIncrementedId();
  const data = snapshot.data();
  const product = new Product(data.name);
  product.updateIncrementedId(nextId);
  return snapshot.ref.set(
    {
      name: product.name,
      incrementedId: product.incrementedId,
    },
    { merge: true },
  );
});
