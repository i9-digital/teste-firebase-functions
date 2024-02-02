import {onRequest} from 'firebase-functions/v2/https';
import {firestore} from 'firebase-functions/v1';
import {applicationDefault, initializeApp} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';


initializeApp({
  credential: applicationDefault(),
});
const db = getFirestore();

async function getNextIncrementedId(): Promise<number> {
  const querySnapshot = await db.collection('product')
    .orderBy('incrementedId', 'desc').limit(1).get();
  if (querySnapshot.empty) return 1;
  const [lastRecord] = querySnapshot.docs;
  return lastRecord.data().incrementedId + 1;
}

export const create = onRequest(async (request, response) => {
  if (request.method !== 'POST') {
    response.status(405).json({error: 'Method Not Allowed'});
    return;
  }
  const record = {
    incrementedId: null,
    name: request.body.name,
  };
  await db.collection('product').add(record);
  response.json(JSON.stringify(record));
});

export const update = firestore.document('product/{productId}')
  .onCreate(async (snapshot) => {
    const nextId = await getNextIncrementedId();
    const data = snapshot.data();
    return snapshot.ref.set({...data, incrementedId: nextId}, {merge: true});
  });
