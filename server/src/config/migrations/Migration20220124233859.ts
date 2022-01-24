import { Migration } from '@mikro-orm/migrations';

export class Migration20220124233859 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "schedule" add column "user_id" varchar(255) not null, add column "trigger_time" text not null;');
  }

}
