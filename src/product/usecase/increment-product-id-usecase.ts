import { UniqueId } from '../../@shared/value-object/unique-id';
import { Product } from '../entity/product';
import { ProductRepository } from '../repository/product-repository';

export interface IncrementProductIdUsecaseInputDto {
  id: string;
  name: string;
}

export class IncrementProductIdUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(inputDto: IncrementProductIdUsecaseInputDto): Promise<void> {
    const product = new Product(new UniqueId(inputDto.id), inputDto.name);
    const nextIncrementalId = await this.getNextIncrementedId();
    product.updateIncrementedId(nextIncrementalId);
    await this.productRepository.update(product);
  }

  private async getNextIncrementedId(): Promise<number> {
    const products = await this.productRepository.list({
      limit: 1,
      orderBy: { field: 'incrementedId', direction: 'desc' },
    });
    if (products.length === 0) return 1;
    const [lastProduct] = products;
    if (!lastProduct.incrementedId) return 1;
    return lastProduct.incrementedId + 1;
  }
}
