import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { HttpStatus } from '@nestjs/common';
import { users } from '../db';

@Injectable()
export class UsersService {
  getAll() {
    return users.map((user) => {
      return {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  }

  getById(id: string) {
    if (!uuidValidate(id)) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Id is invalid' };
    }
    const user = users.find((el) => el.id === id);
    if (user) {
      return {
        statusCode: HttpStatus.OK,
        message: JSON.stringify({
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }),
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "User doesn't exist",
      };
    }
  }

  create(user: CreateUserDto) {
    const isBodyCorrect = user.login && user.password;

    if (isBodyCorrect) {
      const userServiceData = {
        id: uuidv4(),
        version: 0,
        createdAt: Date.now(),
        updatedAt: null,
      };
      users.push({
        ...user,
        ...userServiceData,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: JSON.stringify({ ...userServiceData, login: user.login }),
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Body does not contain required fields',
      };
    }
  }

  update(id: string, updateData: UpdatePasswordDto) {
    if (!uuidValidate(id)) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Id is invalid' };
    }

    const currentUser = users.find((el) => el.id === id);
    if (!currentUser) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "User doesn't exist",
      };
    }

    if (currentUser.password === updateData.oldPassword) {
      currentUser.password = updateData.newPassword;
      currentUser.version += 0.1;
      currentUser.updatedAt = Date.now();

      return {
        statusCode: HttpStatus.OK,
        message: JSON.stringify({
          id: currentUser.id,
          login: currentUser.login,
          version: currentUser.version,
          createdAt: currentUser.createdAt,
          updatedAt: currentUser.updatedAt,
        }),
      };
    } else {
      return {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'The old password is incorrect',
      };
    }
  }

  delete(id: string) {
    if (!uuidValidate(id)) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Id is invalid' };
    }

    const index = users.findIndex((el) => el.id === id);

    if (index < 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "User doesn't exist",
      };
    }

    users.splice(index, 1);
    return { statusCode: HttpStatus.NO_CONTENT, message: null };
  }
}
