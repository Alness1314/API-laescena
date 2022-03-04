import { RolesBuilder } from 'nest-access-control';

export const roles: RolesBuilder = new RolesBuilder();

export enum AppRoles {
  ADMIN = 'ADMIN',
  EMPLEADO = 'EMPLEADO',
  CLIENTE = 'CLIENTE',
}

export enum AppResource {
  USER = 'USER',
  AUTH = 'AUTH',
}

roles
  //EMPLEADO ROLES
  //MODULO USUARIOS
  .grant(AppRoles.EMPLEADO)
  .updateOwn([AppResource.USER])
  .deleteOwn([AppResource.USER])
  .readAny([AppResource.USER])

  //MODULO AUTH
  .readAny([AppResource.AUTH])

  //ADMIN ROLES
  .grant(AppRoles.ADMIN)
  .createAny([AppResource.USER])
  .updateAny([AppResource.USER])
  .deleteAny([AppResource.USER])
  .readAny([AppResource.USER])

  //CLIENTE ROLES
  .grant(AppRoles.CLIENTE)
  .readOwn([AppResource.USER]);
