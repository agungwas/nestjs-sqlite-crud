import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNumberString()
  @ApiProperty()
  readonly price: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @ApiProperty()
  amount: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly name: string;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly price: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  amount: number;
}

export class GetProductDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id?: number
}

export class DeleteProductDto {
  @IsNumber()
  @ApiProperty()
  id: number
}
