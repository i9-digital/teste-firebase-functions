import { UniqueId } from '../../@shared/value-object/unique-id';
import { Product } from '../entity/product';
import { ProductRepository } from '../repository/product-repository';
import { IncrementProductIdUsecase } from './increment-product-id-usecase';

const productRepository: ProductRepository = {
  create: jest.fn(),
  update: jest.fn(),
  list: jest.fn().mockReturnValue([]),
};

describe('IncrementProductIdUsecase', () => {
  it('increments a product incrementedId successfully', async () => {
    const product = new Product(new UniqueId('valid-id'), 'valid product name');
    const sut = new IncrementProductIdUsecase(productRepository);
    await sut.execute({ id: product.id.value, name: product.name });
    product.updateIncrementedId(1);
    expect(productRepository.update).toHaveBeenCalledWith(product);
  });
});
