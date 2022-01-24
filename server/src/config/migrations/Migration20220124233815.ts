import { Migration } from '@mikro-orm/migrations';

export class Migration20220124233815 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "add_database_entry" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null, "database_id" varchar(255) not null, "default_values" varchar(255) not null, "date_filed_name_in_notion" varchar(255) not null, "date_format" varchar(255) not null);');
  }

}
