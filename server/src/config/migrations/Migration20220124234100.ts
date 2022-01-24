import { Migration } from '@mikro-orm/migrations';

export class Migration20220124234100 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "automations" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" timestamptz(0) not null, "trigger_type" int2 not null, "trigger_id" varchar(255) not null, "automation_type" int2 not null, "automation_id" varchar(255) not null);');
  }

}
