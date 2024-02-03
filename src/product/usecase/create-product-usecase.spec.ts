import { UniqueId } from '../../@shared/value-object/unique-id';
import { Product } from '../entity/product';
import { ProductRepository } from '../repository/product-repository';
import { CreateProductUsecase } from './create-product-usecase';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('valid id'),
}));

const productRepository: ProductRepository = {
  create: jest.fn(),
  update: jest.fn(),
  list: jest.fn(),
};

describe('CreateProductUsecase', () => {
  it('creates a product successfully', async () => {
    const sut = new CreateProductUsecase(productRepository);
    const product = new Product(new UniqueId(), 'valid product name');
    await sut.execute({ name: product.name });
    expect(productRepository.create).toHaveBeenCalledWith(product);
  });

  it('returns the product name and incrementedId', async () => {
    const sut = new CreateProductUsecase(productRepository);
    const result = await sut.execute({ name: 'valid product name' });
    expect(result).toEqual({ name: 'valid product name', incrementedId: null });
  });

  it('throws an error when product name is empty', async () => {
    const sut = new CreateProductUsecase(productRepository);
    await expect(sut.execute({ name: '' })).rejects.toThrow('"product.name" is required');
  });
});
