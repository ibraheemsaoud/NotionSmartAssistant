import { Migration } from '@mikro-orm/migrations';

export class Migration20220123130749 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" drop constraint if exists "users_name_check";');
    this.addSql('alter table "users" alter column "name" type text using ("name"::text);');
  }

}
