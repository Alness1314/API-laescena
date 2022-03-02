import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { EditUserDTO } from './dtos/edit-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserFindOne } from './interfaces/userfindone.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getOneUser(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('Usuario no encontado');
    return user;
  }

  async createUser(dto: CreateUserDTO) {
    const userExist = await this.userRepository.findOne({ email: dto.email });
    if (userExist)
      throw new BadRequestException(
        'Existe un usuario con esa direccion de correo',
      );
    const user = this.userRepository.create(dto);
    const data = await this.userRepository.save(user);
    delete data.password;
    return data;
  }

  async updateUser(id: number, dto: EditUserDTO) {
    const user = await this.getOneUser(id);
    const editUser = Object.assign(user, dto);
    return await this.userRepository.save(editUser);
  }

  async deleteUser(id: number) {
    const user = await this.getOneUser(id);
    return await this.userRepository.remove(user);
  }

  async getUserEmail(data: UserFindOne) {
    //usando querybuilder para peticion personalizada a base de datos
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
