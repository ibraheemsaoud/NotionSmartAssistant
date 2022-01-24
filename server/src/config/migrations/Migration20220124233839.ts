import { Migration } from '@mikro-orm/migrations';

export class Migration20220124233839 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "schedule" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
