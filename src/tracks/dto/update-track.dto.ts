import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;
  @IsOptional()
  artistId: string | null;
  @IsOptional()
  albumId: string | null;
  @IsInt()
  duration: number;
}
