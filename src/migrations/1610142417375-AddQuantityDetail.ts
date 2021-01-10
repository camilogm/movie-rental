import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuantityDetail1610142417375 implements MigrationInterface {
  name = 'AddQuantityDetail1610142417375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" ADD "quantity" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" DROP COLUMN "quantity"`,
    );
  }
}
