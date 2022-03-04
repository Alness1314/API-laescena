import { UserEntity } from 'src/modules/user/entities/user.entity';
import { AppRoles } from 'src/modules/user/roles/app.roles';
import { getRepository } from 'typeorm';
import { Configuration } from './config.keys';
import { ConfigService } from './config.service';

export const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<UserEntity>(UserEntity);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('email = :email', {
      email: config.get(Configuration.DEFAULT_USER_EMAIL),
    })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
      email: config.get(Configuration.DEFAULT_USER_EMAIL),
      password: config.get(Configuration.DEFAULT_USER_PASS),
      roles: [AppRoles.ADMIN],
    });

    return await userRepository.save(adminUser);
  }
};
