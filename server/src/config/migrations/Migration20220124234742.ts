import { Migration } from '@mikro-orm/migrations';

export class Migration20220124234742 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "automations" drop constraint if exists "automations_user_id_check";');
    this.addSql('alter table "automations" alter column "user_id" type varchar(255) using ("user_id"::varchar(255));');
  }

}
