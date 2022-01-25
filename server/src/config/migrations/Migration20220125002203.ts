import { Migration } from '@mikro-orm/migrations';

export class Migration20220125002203 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "automations" rename column "automation_type" to "action_type";');


    this.addSql('alter table "automations" add column "action_id" int4 not null;');
    this.addSql('alter table "automations" drop constraint if exists "automations_user_id_check";');
    this.addSql('alter table "automations" alter column "user_id" type int4 using ("user_id"::int4);');
    this.addSql('alter table "automations" drop constraint if exists "automations_trigger_id_check";');
    this.addSql('alter table "automations" alter column "trigger_id" type int4 using ("trigger_id"::int4);');
    this.addSql('alter table "automations" drop column "automation_id";');

    this.addSql('alter table "add_database_entry" drop constraint if exists "add_database_entry_user_id_check";');
    this.addSql('alter table "add_database_entry" alter column "user_id" type int4 using ("user_id"::int4);');
  }

}
