import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddField1749343929854 implements MigrationInterface {
  private table = 'users';
  private columnName = 'external_application';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.table,
      new TableColumn({
        name: this.columnName,
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.table, this.columnName);
  }
}
