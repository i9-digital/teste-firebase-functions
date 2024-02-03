import { UniqueId } from '../../@shared/value-object/unique-id';
import { Product } from '../entity/product';
import { ProductRepository } from '../repository/product-repository';

export interface CreateProductUsecaseInputDto {
  name: string;
}

export interface CreateProductUsecaseOutputDto {
  name: string;
  incrementedId: number | null;
}

export class CreateProductUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(inputDto: CreateProductUsecaseInputDto): Promise<CreateProductUsecaseOutputDto> {
    const product = new Product(new UniqueId(), inputDto.name);
    await this.productRepository.create(product);
    return {
      name: product.name,
      incrementedId: product.incrementedId,
    };
  }
}
