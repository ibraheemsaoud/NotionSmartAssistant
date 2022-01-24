import { Migration } from '@mikro-orm/migrations';

export class Migration20220124234012 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "schedule" add column "trigger_condition" int2 not null;');
  }

}
