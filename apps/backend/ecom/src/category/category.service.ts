import { product_category } from './../../../../../node_modules/.prisma/client/index.d';
import { DatabaseService } from '@27feb/common/database/database.service';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createCategoryDto: PrismaClient.product_categoryCreateInput) {
    return 'This action adds a new category';
  }

  findAll() {
    // return `This action returns all category`;
    return this.databaseService.product_category.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(
    id: number,
    updateCategoryDto: PrismaClient.product_categoryUpdateInput
  ) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
