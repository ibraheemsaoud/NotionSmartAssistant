import { Migration } from '@mikro-orm/migrations';

export class Migration20220124234019 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "schedule" add column "days_of_the_week" text[] null, add column "month_frequency" jsonb null;');
  }

}
