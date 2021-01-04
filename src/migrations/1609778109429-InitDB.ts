import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1609778109429 implements MigrationInterface {
  name = 'InitDB1609778109429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" SERIAL NOT NULL, "title" character varying(30) NOT NULL, "description" character varying(1000) NOT NULL, "poster" character varying(100) NOT NULL, "stock" integer NOT NULL, "trailerLink" character varying(100) NOT NULL, "salePrice" numeric(5,2) NOT NULL, "availability" boolean NOT NULL, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "StateMovie" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, CONSTRAINT "PK_8d9b1ac842f2f90e36d324d5263" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "RentBuy" ("id" SERIAL NOT NULL, "transactionDate" TIMESTAMP NOT NULL, "returnDate" TIMESTAMP, "price" numeric(5,2) NOT NULL, "userId" integer, "movieId" integer, "stateId" integer, CONSTRAINT "PK_920d41bcb9a8baae24d0d5a999f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(10) NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying(30) NOT NULL, "lastName" character varying(30) NOT NULL, "userName" character varying(20) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "roleId" integer, CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies_likes_users" ("moviesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_c303bf0f90a0a47d14595aa26c5" PRIMARY KEY ("moviesId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f725e7469ee5220c6b2246e2dc" ON "movies_likes_users" ("moviesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d8a15bfe2768dc681c83d3e59" ON "movies_likes_users" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movies_tags_tags" ("moviesId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_537bec4e832e964d92ae6cdd06b" PRIMARY KEY ("moviesId", "tagsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ca2153346a50348cec77c3201" ON "movies_tags_tags" ("moviesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21863da94b41f8391153dfef95" ON "movies_tags_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "RentBuy" ADD CONSTRAINT "FK_5d870d26bcb9901cc7bbcb808f3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "RentBuy" ADD CONSTRAINT "FK_0f7c34a6acfe7c0bdcb5593b59c" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "RentBuy" ADD CONSTRAINT "FK_a1fe3f1161b2dd5090bbefe87d1" FOREIGN KEY ("stateId") REFERENCES "StateMovie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_likes_users" ADD CONSTRAINT "FK_f725e7469ee5220c6b2246e2dc4" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_likes_users" ADD CONSTRAINT "FK_3d8a15bfe2768dc681c83d3e59a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_tags_tags" ADD CONSTRAINT "FK_5ca2153346a50348cec77c32013" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_tags_tags" ADD CONSTRAINT "FK_21863da94b41f8391153dfef953" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO "roles" ("name") VALUES ('SUPERADMIN'),('ADMIN'),('CLIENT')`,
    );

    await queryRunner.query(
      `INSERT INTO "users" ("firstName","lastName","userName","email","password","roleId")  VALUES('admin','admin','root','gmcamiloe@gmail.com','$2b$10$TlE9g55QPrr4wLdi43VY/Oz8dCfyUX1ug1VGUkAeUjgxCCFGLff5O',1)`,
    );

    await queryRunner.query(
      `	INSERT INTO "StateMovie" ("name") VALUES ('rent'),('buy'),('delayed'),('returned')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies_tags_tags" DROP CONSTRAINT "FK_21863da94b41f8391153dfef953"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_tags_tags" DROP CONSTRAINT "FK_5ca2153346a50348cec77c32013"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_likes_users" DROP CONSTRAINT "FK_3d8a15bfe2768dc681c83d3e59a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_likes_users" DROP CONSTRAINT "FK_f725e7469ee5220c6b2246e2dc4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "RentBuy" DROP CONSTRAINT "FK_a1fe3f1161b2dd5090bbefe87d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "RentBuy" DROP CONSTRAINT "FK_0f7c34a6acfe7c0bdcb5593b59c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "RentBuy" DROP CONSTRAINT "FK_5d870d26bcb9901cc7bbcb808f3"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_21863da94b41f8391153dfef95"`);
    await queryRunner.query(`DROP INDEX "IDX_5ca2153346a50348cec77c3201"`);
    await queryRunner.query(`DROP TABLE "movies_tags_tags"`);
    await queryRunner.query(`DROP INDEX "IDX_3d8a15bfe2768dc681c83d3e59"`);
    await queryRunner.query(`DROP INDEX "IDX_f725e7469ee5220c6b2246e2dc"`);
    await queryRunner.query(`DROP TABLE "movies_likes_users"`);
    await queryRunner.query(`DROP TABLE "tokens"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "RentBuy"`);
    await queryRunner.query(`DROP TABLE "StateMovie"`);
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(`DROP TABLE "tags"`);
  }
}
