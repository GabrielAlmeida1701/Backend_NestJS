import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigrations1702004752336 implements MigrationInterface {
  name = 'InitialMigrations1702004752336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL)'
    );

    await queryRunner.query(
      'CREATE TABLE `refresh_token` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `token` varchar(255) NOT NULL, `expires` datetime NOT NULL, `userId` INTEGER, FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION)'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `refresh_token`');
    await queryRunner.query('DROP TABLE `user`');
  }
}
