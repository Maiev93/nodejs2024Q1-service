import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
      },
    ]),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
