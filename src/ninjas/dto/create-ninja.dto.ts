import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;

  @IsEnum(['stars', 'katakana'], { message: 'Use a correct weapon!' })
  weapon: 'stars' | 'katana';
}
