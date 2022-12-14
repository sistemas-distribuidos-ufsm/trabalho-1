import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FiltersDto } from '../utils/filters.dto';
import { CreateDogBiteDto } from './dto/create-dog-bite.dto';
import { UpdateDogBiteDto } from './dto/update-dog-bite.dto';
import { DogBite } from './entities/dog-bite.entity';

@Injectable()
export class DogBiteService {
  constructor(@InjectModel(DogBite) private dogBiteModel: typeof DogBite) {}

  async create(data: CreateDogBiteDto): Promise<DogBite> {
    try {
      const dogBite = await this.dogBiteModel.create(data);

      return dogBite;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(filters: FiltersDto): Promise<DogBite[]> {
    try {
      const { limit, offset } = filters;

      const dogBites: DogBite[] = await this.dogBiteModel.findAll({
        limit: limit,
        offset: offset,
      });

      return dogBites;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number): Promise<DogBite> {
    try {
      const dogBite: DogBite = await this.dogBiteModel.findByPk(id);

      if (!dogBite) {
        throw new NotFoundException('Dog bite not found');
      }

      return dogBite;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const dogBite: DogBite = await this.dogBiteModel.findByPk(id);

      if (!dogBite) {
        throw new NotFoundException('Dog bite not found');
      }

      await dogBite.destroy();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, data: UpdateDogBiteDto): Promise<void> {
    try {
      const dogBite: DogBite = await this.dogBiteModel.findByPk(id);

      if (!dogBite) {
        throw new NotFoundException('Dog bite not found');
      }

      await this.dogBiteModel.update(data, {
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
