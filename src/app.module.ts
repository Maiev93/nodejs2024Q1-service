import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    UsersModule,
    RouterModule.register([
      {
        path: 'user',
        module: UsersModule,
      },
    ]),
    TracksModule,
    RouterModule.register([
      {
        path: 'track',
        module: TracksModule,
      },
    ]),
    ArtistsModule,
    RouterModule.register([
      {
        path: 'artist',
        module: ArtistsModule,
      },
    ]),
  ],
})
export class AppModule {}
