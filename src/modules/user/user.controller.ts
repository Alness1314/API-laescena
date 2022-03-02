import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { EditUserDTO } from './dtos/edit-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const data = await this.userService.getAllUsers();
    return {
      message: 'Todos los usuarios',
      data,
    };
  }

  @Get(':id')
  async getOneUser(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.getOneUser(id);
    return {
      message: 'Usuario consultado',
      data,
    };
  }

  @Post()
  async createUser(@Body() dto: CreateUserDTO) {
    const data = await this.userService.createUser(dto);
    return {
      message: 'Usuario creado',
      data,
    };
  }

  @Put(':id')
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUserDTO,
  ) {
    const data = await this.userService.updateUser(id, dto);
    return {
      message: 'Usuario Actualizado',
      data,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.deleteUser(id);
    return {
      message: 'Usuario eliminado',
      data,
    };
  }
}
