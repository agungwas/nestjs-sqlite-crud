import { CreateProductDto, DeleteProductDto, GetProductDto, UpdateProductDto } from '@dtoes/product.dto';
import { IProduct } from '@interfaces/product.interface';
import {
  Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductService } from '@services/product.service';


@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) { }

  @Get(':id?')
  @ApiParam({ name: 'id', type: 'number', allowEmptyValue: true, required: false, allowReserved: false })
  @ApiOkResponse({ description: 'Successfully get product' })
  @ApiNotFoundResponse({ description: 'Data is not exist' })
  @ApiBadRequestResponse({ description: 'Internal Server Error' })
  public async getProducts(
    @Res() res,
    @Param() { id }: GetProductDto,
  ): Promise<IProduct> {
    try {
      const product = await this.productsService.getProducts(id)

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: id ? `Get product with id ${id} success` : 'Get all product success',
        data: product
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        message: err.message || 'Internal Server Error',
        statusCode: err.statusCode || 400
      })
    }
  }

  @Post()
  @ApiOkResponse({ description: 'Successfully create product' })
  @ApiBadRequestResponse({ description: 'Internal Server Error' })
  public async addProduct(
    @Res() res,
    @Body() productDto: CreateProductDto,
  ): Promise<IProduct> {
    try {
      const product = await this.productsService.create(productDto)

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: `Success add product with name "${product.name}"`,
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({ message: err.message || 'Internal Server Error' })
    }
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Successfully get product' })
  @ApiNotFoundResponse({ description: 'Data is not exist' })
  @ApiBadRequestResponse({ description: 'Internal Server Error' })
  public async updateProducts(
    @Res() res,
    @Param() { id }: DeleteProductDto,
    @Body() productDto: UpdateProductDto,
  ): Promise<IProduct> {
    try {
      const product = await this.productsService.updateProduct(id, productDto)

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: `Success update product with id "${product.id}"`,
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        message: err.message || 'Internal Server Error',
        statusCode: err.statusCode || 400
      })
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully get product' })
  @ApiNotFoundResponse({ description: 'Data is not exist' })
  @ApiBadRequestResponse({ description: 'Internal Server Error' })
  public async deleteProducts(
    @Res() res,
    @Param() { id }: DeleteProductDto
  ): Promise<IProduct> {
    try {
      await this.productsService.deleteProduct(id)

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: `Success delete product with id "${id}"`,
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        message: err.message || 'Internal Server Error',
        statusCode: err.statusCode || 400
      })
    }
  }
}
