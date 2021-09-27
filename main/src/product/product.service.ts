import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
      @InjectModel(Product.name) private productModel:Model<ProductDocument>
  ){

  }
  async all(): Promise<Product[]> {
   const product=await this.productModel.find().exec();
  // console.log(product)
    return product;
  }
  async create(data):Promise<Product>
  {
    return new this.productModel(data).save();
  }
  async findone(id:number):Promise<Product>
    {
    return this.productModel.findOne({id});
  }
  async update(id:number,data):Promise<any>
  {
    return this.productModel.findOneAndUpdate({id},data);
  }
  async delete(id:number):Promise<Product>
  {
    return this.productModel.findOneAndDelete({id});
    // return this.productModel.findOneAndRemove({id});
  }
}
