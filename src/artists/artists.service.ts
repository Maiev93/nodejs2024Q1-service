import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { CreateArtistsDto } from './dto/create-artist.dto';
import { UpdateArtistsDto } from './dto/update-artist.dto';
import { HttpStatus } from '@nestjs/common';
import { artists } from '../db';

@Injectable()
export class ArtistsService {
  getAll() {
    return artists;
  }

  getById(id: string) {
    if (!uuidValidate(id)) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Id is invalid' };
    }
    const artist = artists.find((el) => el.id === id);
    if (artist) {
      return {
        statusCode: HttpStatus.OK,
        message: JSON.stringify(artist),
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Artist doesn't exist",
      };
    }
  }

  create(artist: CreateArtistsDto) {
    const isBodyCorrect = artist.name && Object.hasOwn(artist, 'grammy');

    if (isBodyCorrect) {
      const artistData = {
        id: uuidv4(),
        name: artist.name,
        grammy: artist.grammy,
      };
      artists.push(artistData);

      return {
        statusCode: HttpStatus.CREATED,
        message: JSON.stringify(artistData),
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Body does not contain required fields',
      };
    }
  }

  update(id: string, updateData: UpdateArtistsDto) {
    if (!uuidValidate(id)) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Id is invalid' };
    }

    const currentArtist = artists.find((el) => el.id === id);
    if (!currentArtist) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Artist doesn't exist",
      };
    }

    for (const key in currentArtist) {
      currentArtist[key] = updateData[key]
        ? updateData[key]
        : currentArtist[key];
    }

    return {
      statusCode: HttpStatus.OK,
      message: JSON.stringify(currentArtist),
    };
  }

  delete(id: string) {
    if (!uuidValidate(id)) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Id is invalid' };
    }

    const index = artists.findIndex((el) => el.id === id);

    if (index < 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Artist doesn't exist",
      };
    }

    artists.splice(index, 1);
    return { statusCode: HttpStatus.NO_CONTENT, message: null };
  }
}
