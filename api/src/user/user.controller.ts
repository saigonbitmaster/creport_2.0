import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
} from '@nestjs/common';
import { Public } from '../decorators/public.api.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @Public()
  async index(@Response() res: any) {
    const result: any[] = await this.service.findAll();
    return res
      .set({
        'Content-Range': 10,
        'Access-Control-Expose-Headers': 'Content-Range',
      })
      .json(result);
  }

  @Get(':id')
  @Public()
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.service.create(createUserDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.service.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
