import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { NullableType } from '../utils/types/nullable.type';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  create(createProfileDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  findByIds(ids: Number[]): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder()
      .where("id in (:...ids)", { ids: ids })
      .getMany();
  }

  findCalendarEvents(userId: number, fromDate: Date, toDate: Date) {
    return this.usersRepository.find({
      where: [{
        id: userId
      }, {
        calendarEvents: {
          startDate: MoreThanOrEqual(fromDate)
        }
      }, {
        calendarEvents: {
          startDate: LessThanOrEqual(toDate)
        }
      }]
    })
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions
  ): Promise<User[]> {
    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: number, payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
