import { Migration } from '@mikro-orm/migrations';

export class Migration20220124235057 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "add_database_entry" add column "deleted" bool not null, add column "deleted_date" timestamptz(0) not null;');
  }

}
