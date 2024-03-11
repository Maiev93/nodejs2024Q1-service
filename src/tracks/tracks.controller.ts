import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller()
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const data = this.tracksService.getById(id);
    res.status(data.statusCode).send(data.message);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response) {
    const data = this.tracksService.create(createTrackDto);
    res.status(data.statusCode).send(data.message);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    const data = this.tracksService.update(id, updateTrackDto);
    res.status(data.statusCode).send(data.message);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const data = this.tracksService.delete(id);
    res.status(data.statusCode).send(data.message);
  }
}
