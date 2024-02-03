import { UniqueId } from '../../@shared/value-object/unique-id';
import { Product } from './product';

describe('Product', () => {
  const id = new UniqueId();
  it('creates an instance', () => {
    expect(new Product(id, 'valid product name')).toBeTruthy();
  });

  it('defines a name', () => {
    const product = new Product(id, 'valid product name');
    expect(product.name).toBe('valid product name');
  });

  it('trhows an error if try to update name', () => {
    const product = new Product(id, 'valid product name');
    expect(() => {
      // @ts-expect-error testing private member
      product.name = 'new name';
    }).toThrow();
  });

  it('defines an incrementedId', () => {
    const product = new Product(id, 'valid product name');
    product.updateIncrementedId(1);
    expect(product.incrementedId).toBe(1);
  });

  it('defines an incrementedId with null value', () => {
    const product = new Product(id, 'valid product name');
    expect(product.incrementedId).toBeNull();
  });

  it('updates incrementedId', () => {
    const product = new Product(id, 'valid product name');
    product.updateIncrementedId(1);
    product.updateIncrementedId(2);
    expect(product.incrementedId).toBe(2);
  });

  it('trhows an error if try to update incrementedId without correct method', () => {
    const product = new Product(id, 'valid product name');
    expect(() => {
      // @ts-expect-error testing private member
      product.incrementedId = 1;
    }).toThrow();
  });
});
