import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTagDTO } from '../../dto/tags-dto/create-tag.dto';
import { TagEntity } from '../../entities/tag.entity';
import { TagsService } from '../../providers/tags.service';
import {
  createMockRepository,
  MockRepository,
} from '../../../../test/TypeORM.mock';
import { UpdateTagDTO } from '../../dto/tags-dto/update-tag.dto';
import { NotFoundException } from '@nestjs/common';

describe('TagsService', () => {
  let tagsService: TagsService;
  let tagsRepository: MockRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(TagEntity),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    tagsService = module.get<TagsService>(TagsService);
    tagsRepository = module.get<MockRepository>(getRepositoryToken(TagEntity));
  });

  describe('should be defined', () => {
    it('tags service defined', () => {
      expect(tagsService).toBeDefined();
      expect(tagsRepository).toBeDefined();
    });
  });

  describe('create one', () => {
    describe('success create', () => {
      it('created ', async () => {
        const tagDTO: CreateTagDTO = {
          name: 'Terror',
        };

        const expectedTag: TagEntity = {
          id: 1,
          ...tagDTO,
        };

        tagsRepository.save.mockReturnValue(expectedTag);
        const tag = await tagsService.create(tagDTO);
        expect(tag).toEqual(expectedTag);
      });
    });

    describe('failed to create', () => {
      it('throw', async () => {
        const tagDTO: CreateTagDTO = {
          name: 'Terror',
        };
        try {
          await tagsService.create(tagDTO);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); //end of create

  describe('update one', () => {
    describe('success update', () => {
      it('update by id', async () => {
        const tagId = 1;
        const registeredTag: TagEntity = {
          id: 1,
          name: 'Terror',
        };

        const updateDataTag: UpdateTagDTO = {
          name: 'Terrorific',
        };

        const expectedData: TagEntity = {
          ...registeredTag,
          ...updateDataTag,
        };

        tagsRepository.findOne.mockReturnValue(expectedData);
        tagsRepository.save.mockReturnValue(expectedData);
        const updatedTag = await tagsService.update(tagId, updateDataTag);
        expect(updatedTag).toEqual(expectedData);
      });
    });

    describe('failed to update', () => {
      it('not found tag', async () => {
        const tagId = 1;
        const updateDataTag: UpdateTagDTO = {};
        try {
          await tagsService.update(tagId, updateDataTag);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  }); //end of update

  describe('remove one', () => {
    describe('success', () => {
      it('removed by id', async () => {
        const tagId = 1;

        tagsRepository.findOne.mockReturnValue({});
        tagsRepository.remove.mockReturnValue({});
        const removed = await tagsService.delete(tagId);
        expect(removed).toBeTruthy();
      });
    });

    describe('failed to update', () => {
      it('failed', async () => {
        const tagId = 1;
        try {
          await tagsService.delete(tagId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
