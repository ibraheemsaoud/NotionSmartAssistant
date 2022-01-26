import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { ActionTypes, TriggerTypes } from ".";

@ObjectType()
@Entity()
export class Automations {
  @Field()
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
  userId: number;

  @Field(() => TriggerTypes)
  @Enum(() => TriggerTypes)
  triggerType!: TriggerTypes;

  @Field()
  @Property()
  triggerId!: number;

  @Field(() => ActionTypes)
  @Enum(() => ActionTypes)
  actionType!: ActionTypes;

  @Field()
  @Property()
  actionId!: number;

  @Property()
  deleted: boolean = false;

  @Property({ type: "date" })
  deletedDate = new Date();

  @Field()
  @Property()
  disabled: boolean = false;
}
