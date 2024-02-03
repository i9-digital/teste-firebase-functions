import { Firestore } from 'firebase-admin/firestore';
import { Product } from '../entity/product';
import { FirestoreProductRepository } from './firestore-product-repository';
import { UniqueId } from '../../@shared/value-object/unique-id';

describe('FirestoreProductRepository', () => {
  const id = new UniqueId();

  it('persists a product successfully', async () => {
    const setSpy = jest.fn();
    const docSpy = jest.fn(() => ({ set: setSpy }));
    const collectionSpy = jest.spyOn(Firestore.prototype, 'collection').mockReturnValue({ doc: docSpy } as any);
    const sut = new FirestoreProductRepository(new Firestore());
    const product = new Product(id, 'valid product name');
    await sut.create(product);
    expect(collectionSpy).toHaveBeenCalledWith('product');
    expect(docSpy).toHaveBeenCalledWith(id.value);
    expect(setSpy).toHaveBeenCalledWith({ incrementedId: null, name: 'valid product name' });
  });

  it('updates a product successfully', async () => {
    const setSpy = jest.fn();
    const docSpy = jest.fn(() => ({ set: setSpy }));
    const collectionSpy = jest.spyOn(Firestore.prototype, 'collection').mockReturnValue({ doc: docSpy } as any);
    const sut = new FirestoreProductRepository(new Firestore());
    const product = new Product(id, 'valid product name');
    product.updateIncrementedId(20);
    await sut.update(product);
    expect(collectionSpy).toHaveBeenCalledWith('product');
    expect(docSpy).toHaveBeenCalledWith(id.value);
    expect(setSpy).toHaveBeenCalledWith({ name: 'valid product name', incrementedId: 20 }, { merge: true });
  });

  it('lists all products successfully', async () => {
    const getSpy = jest.fn().mockResolvedValue({ docs: [] });
    const limitSpy = jest.fn().mockReturnValue({ get: getSpy });
    const orderBySpy = jest
      .fn()
      .mockReturnValue({ limit: jest.fn().mockReturnValue({ get: getSpy, limit: limitSpy }) });
    const collectionSpy = jest
      .spyOn(Firestore.prototype, 'collection')
      .mockReturnValue({ get: getSpy, orderBy: orderBySpy } as any);
    const sut = new FirestoreProductRepository(new Firestore());
    await sut.list();
    expect(collectionSpy).toHaveBeenCalledWith('product');
    expect(getSpy).toHaveBeenCalled();
    expect(orderBySpy).toHaveBeenCalledWith('incrementedId', 'asc');
  });
});
