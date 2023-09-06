import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjaServices: NinjasService) {}

  // GET /ninjas
  @Get()
  getNinja(@Query('weapon') weapon: 'stars' | 'katakana') {
    return this.ninjaServices.getNinjas(weapon);
  }

  // GET /ninjas/:id
  @Get(':id')
  getOneNinja(@Param('id') id: number) {
    try {
      return this.ninjaServices.getNinja(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaServices.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id
  @Put(':id')
  updateNinja(@Param('id') id: number, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjaServices.updateNinja(+id, updateNinjaDto);
  }

  // Delete /ninjas/:id
  @Delete(':id')
  deleteNinja(@Param('id') id: number) {
    return this.ninjaServices.removeNinja(+id);
  }
}
