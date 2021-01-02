import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDTO } from '../dto/tags-dto/create-tag.dto';
import { UpdateTagDTO } from '../dto/tags-dto/update-tag.dto';
import { TagEntity } from '../entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findOneById(id: number) {
    const tag = await this.tagRepository.findOne(id);

    if (!tag) throw new NotFoundException('Not found a tag with that Id');

    return tag;
  }

  async create(createTagDTO: CreateTagDTO) {
    const savedTag = await this.tagRepository.save(createTagDTO);

    return savedTag;
  }

  async update(id: number, updateTagDTO: UpdateTagDTO) {
    const tag = await this.findOneById(id);

    const updatedTag: TagEntity = await this.tagRepository.save({
      ...tag,
      ...updateTagDTO,
    });

    return updatedTag;
  }

  async delete(id: number) {
    const tag = await this.findOneById(id);

    await this.tagRepository.delete(tag);
    return true;
  }
}
