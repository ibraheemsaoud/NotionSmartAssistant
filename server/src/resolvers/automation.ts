import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import {
  ActionTypes,
  AddDatabaseEntry,
  Automations,
  Schedule,
  TriggerTypes,
} from "../entities";
import { FieldError } from "./Types";

@InputType()
class AutomationData {
  @Field()
  userId: number;
  @Field()
  triggerType!: TriggerTypes;
  @Field()
  triggerId!: number;
  @Field()
  actionType!: ActionTypes;
  @Field()
  actionId!: number;
  @Field()
  deleted: boolean;
  @Field()
  disabled: boolean;
}

@ObjectType()
class AutomationResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Automations, { nullable: true })
  automation?: Automations;
}

const validateAutomation = async (
  { userId, triggerType, triggerId, actionId, actionType }: AutomationData,
  em: MyContext["em"]
): Promise<FieldError[] | true> => {
  const errors: FieldError[] = [];
  const user = await em.findOne(User, { id: userId });
  if (!user) {
    errors.push({ field: "userId", message: "user not found" });
  }
  let action = null;
  switch (actionType) {
    case ActionTypes.ADD_DATABASE_ENTRY:
      action = await em.findOne(AddDatabaseEntry, { id: actionId });
      break;
    default:
      errors.push({ field: "actionType", message: "action not found" });
  }
  if (!action) {
    errors.push({ field: "actionId", message: "action not found" });
  }
  let trigger = null;
  switch (triggerType) {
    case TriggerTypes.SCHEDULE:
      trigger = await em.findOne(Schedule, { id: triggerId });
      break;
    default:
      errors.push({ field: "triggerType", message: "trigger not found" });
  }
  if (!trigger) {
    errors.push({ field: "triggerId", message: "trigger not found" });
  }
  return errors.length ? errors : true;
};

@Resolver()
export class AutomationResolver {
  @Query(() => [Automations])
  automations(
    @Arg("userId", () => Number) userId: number,
    @Ctx() { em }: MyContext
  ): Promise<Automations[]> {
    return em.find(Automations, { userId });
  }

  @Query(() => Automations, { nullable: true })
  automation(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Automations | null> {
    return em.findOne(Automations, { id });
  }

  @Mutation(() => AutomationResponse)
  async createAutomation(
    @Arg("automationData")
    automation: AutomationData,
    @Ctx() { em }: MyContext
  ): Promise<AutomationResponse> {
    const errors = await validateAutomation(automation, em);
    if (errors !== true) {
      return { errors };
    }
    const createdAutomation = em.create(Automations, { ...automation });
    try {
      await em.persistAndFlush(createdAutomation);
    } catch (err) {
      console.error("message", err.message);
      return {
        errors: [
          {
            field: "all",
            message: err.message,
          },
        ],
      };
    }

    return { automation: createdAutomation };
  }

  @Mutation(() => Automations, { nullable: true })
  async updateAutomation(
    @Arg("id") id: number,
    automation: AutomationData,
    @Ctx() { em }: MyContext
  ): Promise<AutomationResponse | null> {
    const automationToUpdate = await em.findOne(Automations, { id });
    if (!automationToUpdate) {
      return null;
    }
    const errors = await validateAutomation(automation, em);
    if (errors !== true) {
      return { errors };
    }
    await em.persistAndFlush({ ...automationToUpdate, ...automation });

    return { automation: { ...automationToUpdate, ...automation } };
  }
}
