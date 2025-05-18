import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddedNewColumn1747591219863 implements MigrationInterface {
  private table = 'users';
  private columnName = 'integration_id';
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
