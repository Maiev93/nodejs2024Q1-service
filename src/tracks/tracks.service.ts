import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { HttpStatus } from '@nestjs/common';
import { tracks } from '../db';

@Injectable()
export class TracksService {
  getAll() {
    return tracks;
  }

  getById(id: string) {
    // if (!uuidValidate(id)) {
    //     return { statusCode: HttpStatus.BAD_REQUEST, message: 'Id is invalid' }
    // }
    const track = tracks.find((el) => el.id === id);
    if (track) {
      return {
        statusCode: HttpStatus.OK,
        message: JSON.stringify(track),
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Track doesn't exist",
      };
    }
  }

  create(track: CreateTrackDto) {
    const isBodyCorrect = track.name && track.duration;

    if (isBodyCorrect) {
      const trackData = {
        id: uuidv4(),
        name: track.name,
        artistId: track.artistId ?? null,
        albumId: track.albumId ?? null,
        duration: track.duration,
      };
      tracks.push(trackData);

      return {
        statusCode: HttpStatus.CREATED,
        message: JSON.stringify(trackData),
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Body does not contain required fields',
      };
    }
  }

  update(id: string, updateData: UpdateTrackDto) {
    // if (!uuidValidate(id)) {
    //     return { statusCode: HttpStatus.BAD_REQUEST, message: 'Id is invalid' }
    // }

    const currentTrack = tracks.find((el) => el.id === id);
    if (!currentTrack) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Track doesn't exist",
      };
    }

    for (const key in currentTrack) {
      currentTrack[key] = updateData[key] ? updateData[key] : currentTrack[key];
    }

    return {
      statusCode: HttpStatus.OK,
      message: JSON.stringify(currentTrack),
    };
  }

  delete(id: string) {
    // if (!uuidValidate(id)) {
    //     return { statusCode: HttpStatus.BAD_REQUEST, message: 'Id is invalid' }
    // }

    const index = tracks.findIndex((el) => el.id === id);

    if (index < 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Track doesn't exist",
      };
    }

    tracks.splice(index, 1);
    return { statusCode: HttpStatus.NO_CONTENT, message: null };
  }
}
