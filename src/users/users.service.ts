import { inject, injectable } from 'inversify';

import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUsersService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		// создали нового пользователя
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));

		// проверка что он есть?
		const existedUser = await this.usersRepository.find(email);
		// если есть возвращаем null
		if (existedUser) {
			return null;
		}
		// если нет - создаём
		return this.usersRepository.create(newUser);
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
