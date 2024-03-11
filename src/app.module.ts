import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module'

@Module({
  imports: [
    UsersModule,
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
      },
    ]),
    TracksModule,
    RouterModule.register([
      {
        path: 'tracks',
        module: TracksModule,
      },
    ]),
  ],
})
export class AppModule { }
