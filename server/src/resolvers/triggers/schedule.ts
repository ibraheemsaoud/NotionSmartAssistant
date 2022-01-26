import { User } from "../../entities/User";
import { MyContext } from "../../types";
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
import { Schedule, TriggerCondition } from "../../entities";
import { FieldError } from "../types";
import { validateEnum } from "../validations/enums";

@InputType()
class ScheduleData {
  @Field()
  userId!: number;
  @Field()
  triggerCondition!: TriggerCondition;
  @Field()
  triggerTime!: string;
  @Field(() => [Boolean])
  daysOfTheWeek: Boolean[];
  @Field()
  monthFrequency: Number;
}

@ObjectType()
class ScheduleResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Schedule, { nullable: true })
  schedule?: Schedule;
}

const validateSchedule = async (
  {
    userId,
    triggerCondition,
    triggerTime,
    daysOfTheWeek,
    monthFrequency,
  }: ScheduleData,
  em: MyContext["em"]
): Promise<FieldError[] | true> => {
  const errors: FieldError[] = [];
  const user = await em.findOne(User, { id: userId });
  if (!user) {
    errors.push({ field: "userId", message: "user not found" });
  }
  const triggerConditionError = validateEnum<TriggerCondition>(
    TriggerCondition,
    "triggerCondition",
    triggerCondition
  );
  if (triggerConditionError !== true) {
    errors.push(triggerConditionError);
  }
  if (RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/).test(triggerTime)) {
    errors.push({ field: "triggerTime", message: "triggerTime is not valid" });
  }
  if (daysOfTheWeek && daysOfTheWeek.length !== 7) {
    errors.push({
      field: "daysOfTheWeek",
      message: "daysOfTheWeek must have 7 values",
    });
  }
  if (monthFrequency && monthFrequency < 1) {
    errors.push({
      field: "monthFrequency",
      message: "monthFrequency must be greater than 0",
    });
  }
  return errors.length ? errors : true;
};

@Resolver()
export class ScheduleResolver {
  @Query(() => [Schedule])
  scheduleUserActions(
    @Arg("userId", () => Number) userId: number,
    @Ctx() { em }: MyContext
  ): Promise<Schedule[]> {
    return em.find(Schedule, { userId, deleted: false });
  }

  @Query(() => Schedule, { nullable: true })
  scheduleAction(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Schedule | null> {
    return em.findOne(Schedule, { id, deleted: false });
  }

  @Mutation(() => ScheduleResponse)
  async createschedule(
    @Arg("scheduleData")
    schedule: ScheduleData,
    @Ctx() { em }: MyContext
  ): Promise<ScheduleResponse> {
    const errors = await validateSchedule(schedule, em);
    if (errors !== true) {
      return { errors };
    }
    const createdTrigger = em.create(Schedule, {
      ...schedule,
    });
    try {
      await em.persistAndFlush(createdTrigger);
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

    return { schedule: createdTrigger };
  }

  // TODO update schedule mutations here, too lazy to do it now
}
