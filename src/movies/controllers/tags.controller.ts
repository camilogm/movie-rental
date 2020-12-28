import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTagDTO } from '../dto/tags-dto/create-tag.dto';
import { UpdateTagDTO } from '../dto/tags-dto/update-tag.dto';
import { TagsService } from '../providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDTO: CreateTagDTO) {
    return this.tagsService.create(createTagDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDTO: UpdateTagDTO) {
    return this.tagsService.update(+id, updateTagDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return this.tagsService.delete(id);
  }
}
