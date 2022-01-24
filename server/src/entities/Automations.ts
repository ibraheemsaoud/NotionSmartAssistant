import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { AutomationTypes, TriggerTypes } from ".";

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

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  userId = new Date();

  @Field(() => TriggerTypes)
  @Enum(() => TriggerTypes)
  triggerType!: TriggerTypes;

  @Field(() => String)
  @Property({ type: "string" })
  triggerId!: string;

  @Field(() => AutomationTypes)
  @Enum(() => AutomationTypes)
  automationType!: AutomationTypes;

  @Field(() => String)
  @Property({ type: "string" })
  automationId!: string;
}
