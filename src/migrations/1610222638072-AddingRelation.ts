import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingRelation1610222638072 implements MigrationInterface {
  name = 'AddingRelation1610222638072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" DROP CONSTRAINT "FK_d4843ef5fb0acb6a1ea470236c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" ADD CONSTRAINT "FK_d4843ef5fb0acb6a1ea470236c6" FOREIGN KEY ("invoiceId") REFERENCES "Invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" DROP CONSTRAINT "FK_d4843ef5fb0acb6a1ea470236c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" ADD CONSTRAINT "FK_d4843ef5fb0acb6a1ea470236c6" FOREIGN KEY ("invoiceId") REFERENCES "Invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
