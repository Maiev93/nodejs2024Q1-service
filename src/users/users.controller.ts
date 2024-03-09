import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Res,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string, @Res() res: Response) {
        const data = this.usersService.getById(id);
        res.status(data.statusCode).send(data.message)
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const data = this.usersService.create(createUserDto)
        res.status(data.statusCode).send(data.message)
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updatePasswordDto: UpdatePasswordDto,
        @Res() res: Response
    ) {
        const data = this.usersService.update(id, updatePasswordDto)
        res.status(data.statusCode).send(data.message)
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Res() res: Response) {
        const data = this.usersService.delete(id);
        res.status(data.statusCode).send(data.message)
    }
}
