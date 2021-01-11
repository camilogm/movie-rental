import { Repository } from 'typeorm';

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

export const mockQueryBuilder = jest.fn(() => ({
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  addSelect: jest.fn().mockReturnThis(),
  getMany: () => [],
  getOne: () => {
    return {};
  },
}));

export const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: mockQueryBuilder,
});
