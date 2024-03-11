import { IsString, IsInt, IsOptional } from 'class-validator';
// export interface CreateTrackDto {
//   name: string;
//   artistId: string | null;
//   albumId: string | null;
//   duration: number;
// }

export class CreateTrackDto {
  @IsString()
  name: string;
  @IsOptional()
  artistId: string | null;
  @IsOptional()
  albumId: string | null;
  @IsInt()
  duration: number;
}
