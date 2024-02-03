import { Firestore } from 'firebase-admin/firestore';
import fft from 'firebase-functions-test';
import * as sut from './index';

const req = { method: 'POST', body: {} } as any;
const res = { status: jest.fn(() => res), json: jest.fn() } as any;

describe('/create', () => {
  it.each(['GET', 'PUT', 'PATCH', 'DELETE'])('returns 405 if request method is %s', async (method) => {
    await sut.create({ ...req, method }, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'method not allowed' });
  });

  it('return 400 if body data is invalid', async () => {
    await sut.create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: '"name" is required' });
  });

  it('creates a product successfully', async () => {
    const addSpy = jest.fn();
    const collectionSpy = jest.spyOn(Firestore.prototype, 'collection').mockReturnValue({ add: addSpy } as any);
    await sut.create({ ...req, body: { name: 'test' } }, res);
    expect(res.json).toHaveBeenCalledWith({ incrementedId: null, name: 'test' });
    expect(collectionSpy).toHaveBeenCalledWith('product');
    expect(addSpy).toHaveBeenCalledWith({ incrementedId: null, name: 'test' });
  });
});

describe('/update', () => {
  it('updates product.incrementedId successfully', async () => {
    const setSpy = jest.fn();
    jest.spyOn(Firestore.prototype, 'collection').mockReturnValue({
      orderBy: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({ get: jest.fn().mockResolvedValue({ empty: true }) }),
      }),
    } as any);
    const { wrap } = fft();
    await wrap(sut.update)({ data: () => ({ name: 'test' }), ref: { set: setSpy } } as any);
    expect(setSpy).toHaveBeenCalledWith({ incrementedId: 1, name: 'test' }, { merge: true });
  });
});
