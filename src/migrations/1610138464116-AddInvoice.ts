import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInvoice1610138464116 implements MigrationInterface {
  name = 'AddInvoice1610138464116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice_detail" ("id" SERIAL NOT NULL, "returnDate" TIMESTAMP, "price" numeric(5,2) NOT NULL, "stateId" integer, "invoiceId" integer, "movieId" integer, CONSTRAINT "PK_3d65640b01305b25702d2de67c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Invoices" ("id" SERIAL NOT NULL, "total" numeric(5,2) NOT NULL, "transactionDate" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_89f2f5f3cb6dc35e50b7c6ab8c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" ADD CONSTRAINT "FK_b7785e906895d2db9e558b11ce5" FOREIGN KEY ("stateId") REFERENCES "StateMovie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" ADD CONSTRAINT "FK_d4843ef5fb0acb6a1ea470236c6" FOREIGN KEY ("invoiceId") REFERENCES "Invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" ADD CONSTRAINT "FK_9d771c6bbbc45c46a4ff0124fb5" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Invoices" ADD CONSTRAINT "FK_9c2859c28c8179e8e013cd091aa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Invoices" DROP CONSTRAINT "FK_9c2859c28c8179e8e013cd091aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" DROP CONSTRAINT "FK_9d771c6bbbc45c46a4ff0124fb5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" DROP CONSTRAINT "FK_d4843ef5fb0acb6a1ea470236c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_detail" DROP CONSTRAINT "FK_b7785e906895d2db9e558b11ce5"`,
    );
    await queryRunner.query(`DROP TABLE "Invoices"`);
    await queryRunner.query(`DROP TABLE "invoice_detail"`);
  }
}
