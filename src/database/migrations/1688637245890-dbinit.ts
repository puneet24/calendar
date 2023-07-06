import { MigrationInterface, QueryRunner } from "typeorm";

export class Dbinit1688637245890 implements MigrationInterface {
    name = 'Dbinit1688637245890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "calendar_event_type" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9d8a3c0119ac3fc5bfd94a0f7db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calendar_event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "rrule" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "primaryHostId" integer, "typeId" integer, CONSTRAINT "REL_2a18c03d2f34f65786cc2ad32f" UNIQUE ("primaryHostId"), CONSTRAINT "PK_176fe24e6eb48c3fef696c7641f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae02996e95c652ae67b65c73d2" ON "calendar_event" ("startDate") `);
        await queryRunner.query(`CREATE INDEX "IDX_d89c8d66a02e832c51a1c5ea6d" ON "calendar_event" ("endDate") `);
        await queryRunner.query(`CREATE TABLE "calendar_availibility" ("id" SERIAL NOT NULL, "availableRrule" character varying NOT NULL, "duration" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "calendarSettingId" integer, CONSTRAINT "PK_e32b8e4ba327a0c6815bfdaeeb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calendar_setting" ("id" SERIAL NOT NULL, "timeZone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "REL_539f3d7e3bc3d7bf9f6db292bf" UNIQUE ("userId"), CONSTRAINT "PK_2462d169d2af0485a8a3d03888c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "calendarSettingId" integer, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_74d52eb0afc6515062829795f4" UNIQUE ("calendarSettingId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `);
        await queryRunner.query(`CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `);
        await queryRunner.query(`CREATE TABLE "forgot" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `);
        await queryRunner.query(`CREATE TABLE "users_calendar_events" ("calendarEventId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_781b603a5a80fce696838c44eb1" PRIMARY KEY ("calendarEventId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0bbf22da82aa52f037882befc5" ON "users_calendar_events" ("calendarEventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ebd090699e3713658152bc3e51" ON "users_calendar_events" ("userId") `);
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD CONSTRAINT "FK_2a18c03d2f34f65786cc2ad32ff" FOREIGN KEY ("primaryHostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD CONSTRAINT "FK_a1cb0a84e733ff4c307c02ec9fe" FOREIGN KEY ("typeId") REFERENCES "calendar_event_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendar_availibility" ADD CONSTRAINT "FK_58b52be9eaa203a2193ebd6eed4" FOREIGN KEY ("calendarSettingId") REFERENCES "calendar_setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendar_setting" ADD CONSTRAINT "FK_539f3d7e3bc3d7bf9f6db292bfe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_74d52eb0afc6515062829795f4d" FOREIGN KEY ("calendarSettingId") REFERENCES "calendar_setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_calendar_events" ADD CONSTRAINT "FK_0bbf22da82aa52f037882befc51" FOREIGN KEY ("calendarEventId") REFERENCES "calendar_event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_calendar_events" ADD CONSTRAINT "FK_ebd090699e3713658152bc3e510" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_calendar_events" DROP CONSTRAINT "FK_ebd090699e3713658152bc3e510"`);
        await queryRunner.query(`ALTER TABLE "users_calendar_events" DROP CONSTRAINT "FK_0bbf22da82aa52f037882befc51"`);
        await queryRunner.query(`ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_74d52eb0afc6515062829795f4d"`);
        await queryRunner.query(`ALTER TABLE "calendar_setting" DROP CONSTRAINT "FK_539f3d7e3bc3d7bf9f6db292bfe"`);
        await queryRunner.query(`ALTER TABLE "calendar_availibility" DROP CONSTRAINT "FK_58b52be9eaa203a2193ebd6eed4"`);
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP CONSTRAINT "FK_a1cb0a84e733ff4c307c02ec9fe"`);
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP CONSTRAINT "FK_2a18c03d2f34f65786cc2ad32ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ebd090699e3713658152bc3e51"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0bbf22da82aa52f037882befc5"`);
        await queryRunner.query(`DROP TABLE "users_calendar_events"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df507d27b0fb20cd5f7bef9b9a"`);
        await queryRunner.query(`DROP TABLE "forgot"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "calendar_setting"`);
        await queryRunner.query(`DROP TABLE "calendar_availibility"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d89c8d66a02e832c51a1c5ea6d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae02996e95c652ae67b65c73d2"`);
        await queryRunner.query(`DROP TABLE "calendar_event"`);
        await queryRunner.query(`DROP TABLE "calendar_event_type"`);
    }

}
