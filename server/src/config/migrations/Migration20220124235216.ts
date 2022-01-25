import { Migration } from '@mikro-orm/migrations';

export class Migration20220124235216 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "automations" add column "deleted" bool not null, add column "deleted_date" timestamptz(0) not null, add column "disabled" bool not null;');

    this.addSql('alter table "schedule" add column "deleted" bool not null, add column "deleted_date" timestamptz(0) not null;');
  }

}
