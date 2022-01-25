import { Migration } from '@mikro-orm/migrations';

export class Migration20220125214430 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "schedule" drop constraint if exists "schedule_user_id_check";');
    this.addSql('alter table "schedule" alter column "user_id" type int4 using ("user_id"::int4);');
  }

}
