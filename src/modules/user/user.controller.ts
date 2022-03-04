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
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { Auth } from '../common/decorators/auth.decorator';
import { User } from '../common/decorators/user.decorator';
import { CreateUserDTO } from './dtos/create-user.dto';
import { EditUserDTO } from './dtos/edit-user.dto';
import { UserEntity } from './entities/user.entity';
import { AppResource } from './roles/app.roles';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.USER,
  })
  @Get()
  async getAllUsers() {
    const data = await this.userService.getAllUsers();
    return {
      message: 'Todos los usuarios',
      data,
    };
  }

  @Auth({
    possession: 'own',
    action: 'read',
    resource: AppResource.USER,
  })
  @Get(':id')
  async getOneUser(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    let data;
    if (this.rolesBuilder.can(user.roles).readAny(AppResource.USER).granted) {
      data = await this.userService.getOneUser(id);
    } else {
      data = await this.userService.getOneUser(id, user);
    }

    return {
      message: 'Usuario consultado',
      data,
    };
  }

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @Post()
  async createUser(@Body() dto: CreateUserDTO) {
    const data = await this.userService.createUser(dto);
    return {
      message: 'Usuario creado',
      data,
    };
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER,
  })
  @Put(':id')
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUserDTO,
    @User() user: UserEntity,
  ) {
    let data;
    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      //permiso de administrador puede editar todos los usuarios
      data = await this.userService.updateUser(id, dto);
    } else {
      //permiso de empleado puede editar su propio perfil
      delete dto.roles;
      data = await this.userService.updateUser(id, dto, user);
    }
    return {
      message: 'Usuario Actualizado',
      data,
    };
  }

  @Auth()
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.deleteUser(id);
    return {
      message: 'Usuario eliminado',
      data,
    };
  }
}
