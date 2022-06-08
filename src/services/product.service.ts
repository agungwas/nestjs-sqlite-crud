import { CreateProductDto, UpdateProductDto } from '@dtoes/product.dto';
import { IProduct } from '@interfaces/product.interface';
import { Products } from '@models/products.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  public async create(productDto: CreateProductDto): Promise<IProduct> {
    return await this.productRepository.save(productDto);
  }

  public async getProducts(productId: number) {
    const data = productId ? await this.productRepository.findOne(productId) : await this.productRepository.find()
    if (!data) throw { statusCode: 404, message: 'Product not found' }
    return data
  }

  public async updateProduct(id: number, productDto: UpdateProductDto): Promise<Products> {
    const product = await this.productRepository.findOne(id);
    if (!product) throw { statusCode: 404, message: 'Product not found' }

    for (const key in productDto) {
      if (productDto[key]) product[key] = productDto[key]
    }

    return await this.productRepository.save(product);
  }

  public async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.delete({ id });
    if (!product) throw { statusCode: 404, message: 'Product not found' }
  }
}
