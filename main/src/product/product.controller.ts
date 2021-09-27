import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import EventEmitter from 'events';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private httpservice: HttpService,
    ) {}
// @EventPattern('hello') 
  @Get()
  async all(data:any) {
   // console.log(data);
    return  this.service.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
      const post1 = await this.service.findone(id);
      this.httpservice.post(`http://localhost:3000/api/product/${id}/like`, {}).subscribe(
          res => {
              console.log(res);
          }
      )
      return  this.service.update(id, {
          likes: post1.likes+1
      });
  }

  @EventPattern('product_created')
  async Post(product:any) {
   console.log(product)
   await this.service.create({
      id:product.id,
      title:product.title,
      image:product.image,
      likes:product.likes,
      
    });
    
  }

  @EventPattern('product_updated')
  async productupdated(product:any) {
    console.log(product)
   await this.service.update(product.id,{
      id:product.id,
      title:product.title,
      image:product.image,
      likes:product.likes,
      
    });
    
  }

  // @EventPattern('product_deleted')
  // async productdeleted(product:any) {
  //  console.log(product.id)
  //  await this.service.delete(product.id);
    
  // }
  @EventPattern('product_deleted')
    async postDeleted(id: number) {
     // console.log(id)
        await this.service.delete(id);
    }
  // @EventPattern('hello')
  // async hello(data:string)
  // {
  //   console.log(data)
  // }
}
