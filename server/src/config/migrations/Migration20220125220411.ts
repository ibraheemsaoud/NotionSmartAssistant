import { Migration } from '@mikro-orm/migrations';

export class Migration20220125220411 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_password_check";');
    this.addSql('alter table "user" alter column "password" type varchar(255) using ("password"::varchar(255));');
  }

}
