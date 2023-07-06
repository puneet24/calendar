import { MigrationInterface, QueryRunner } from "typeorm";

export class Dbinitv11688636340693 implements MigrationInterface {
    name = 'Dbinitv11688636340693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`);
        await queryRunner.query(`ALTER TABLE "users_calendar_events" DROP CONSTRAINT "FK_ebd090699e3713658152bc3e510"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
        await queryRunner.query(`ALTER TABLE "users_calendar_events" ADD CONSTRAINT "FK_ebd090699e3713658152bc3e510" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_calendar_events" DROP CONSTRAINT "FK_ebd090699e3713658152bc3e510"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
        await queryRunner.query(`ALTER TABLE "users_calendar_events" ADD CONSTRAINT "FK_ebd090699e3713658152bc3e510" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
