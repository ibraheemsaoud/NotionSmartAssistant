import { Migration } from '@mikro-orm/migrations';

export class Migration20220124234325 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "schedule" drop constraint if exists "schedule_month_frequency_check";');
    this.addSql('alter table "schedule" alter column "month_frequency" type int4 using ("month_frequency"::int4);');
  }

}
