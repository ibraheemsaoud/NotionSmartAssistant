import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";

export enum TriggerCondition {
  DAILY, // daily at min X
  WEEKLY, // one or more days of the week at min X
  MONTHLY, // one day every N months, at min X
  NthDayOfTheMonth, // triggered every month on the same calander day at min X (every first sunday)
}

registerEnumType(TriggerCondition, {
  name: "TriggerCondition",
});

@ObjectType()
@Entity()
export class Schedule {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property()
  userId!: number;

  @Field()
  @Enum(() => TriggerCondition)
  triggerCondition!: TriggerCondition;

  @Field()
  @Property({ type: "text" })
  triggerTime!: string;

  @Field(() => [Boolean])
  @Property({ nullable: true })
  daysOfTheWeek: Boolean[];

  @Field(() => Int)
  @Property({ nullable: true })
  monthFrequency: Number;

  @Property()
  deleted: boolean = false;

  @Property({ type: "date" })
  deletedDate = new Date();
}
