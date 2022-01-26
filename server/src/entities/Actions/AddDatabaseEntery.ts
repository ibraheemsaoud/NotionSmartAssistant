import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class AddDatabaseEntry {
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
  @Property()
  userId!: number;

  @Field(() => String)
  @Property()
  databaseId!: string;

  @Field()
  @Property()
  defaultValues!: string;

  @Field()
  @Property()
  dateFiledNameInNotion!: string;

  @Field()
  @Property()
  dateFormat!: string;

  @Property()
  deleted: boolean = false;

  @Property({ type: "date" })
  deletedDate = new Date();
}
