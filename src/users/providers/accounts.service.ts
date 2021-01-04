import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user-dtos/create-user.dto';
import { UpdateUserDto } from '../dto/user-dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ROLES_PROVIDER } from '../../constants';
import { RolesDTO } from '../dto/roles.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(ROLES_PROVIDER) private readonly roles: RolesDTO,
  ) {}

  async createClient(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      role: this.roles.CLIENT,
    });

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['role'],
    });

    if (!user) throw new NotFoundException(`Not found user with id ${id}`);

    return user;
  }

  async findOneByUserName(userName: string) {
    const user = await this.userRepository.findOne({
      where: { userName },
      relations: ['role'],
    });

    if (!user)
      throw new NotFoundException(`Not found user with username ${userName}`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);

    const password = updateUserDto.password
      ? await bcrypt.hash(updateUserDto.password, 10)
      : user?.password;

    const updatedUserData = this.userRepository.create({
      ...user,
      ...updateUserDto,
      password,
    });
    const updatedUser = await this.userRepository.save(updatedUserData);

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    await this.userRepository.remove(user);

    return true;
  }

  async updateRole(idUser: number, idRole: number) {
    const user = await this.findOneById(idUser);

    if (idRole === 1 || idUser === 1)
      throw new ConflictException('Cannot be more of one Super admin');

    user.role = this.roles.findRoleById(idRole);
    return await this.userRepository.save(user);
  }
}
