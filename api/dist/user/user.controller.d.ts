import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    index(res: any): Promise<any>;
    find(id: string): Promise<import("./schemas/user.schema").User>;
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schemas/user.schema").User>;
    delete(id: string): Promise<import("./schemas/user.schema").User>;
}
