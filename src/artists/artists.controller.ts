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
import { Response } from 'express';
import { ArtistsService } from './artists.service';
import { CreateArtistsDto } from './dto/create-artist.dto';
import { UpdateArtistsDto } from './dto/update-artist.dto';

@Controller()
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string, @Res() res: Response) {
    const data = this.artistsService.getById(id);
    res.status(data.statusCode).send(data.message);
  }

  @Post()
  create(@Body() createArtistsDto: CreateArtistsDto, @Res() res: Response) {
    const data = this.artistsService.create(createArtistsDto);
    res.status(data.statusCode).send(data.message);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistsDto: UpdateArtistsDto,
    @Res() res: Response,
  ) {
    const data = this.artistsService.update(id, updateArtistsDto);
    res.status(data.statusCode).send(data.message);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res: Response) {
    const data = this.artistsService.delete(id);
    res.status(data.statusCode).send(data.message);
  }
}
