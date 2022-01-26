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
import { AddDatabaseEntry } from "../../entities";
import { FieldError } from "../types";
import { validateDateFormat } from "../validations";

@InputType()
class AddDatabaseEntryData {
  @Field()
  userId: number;
  @Field()
  databaseId!: string;
  @Field()
  defaultValues!: string;
  @Field()
  dateFiledNameInNotion!: string;
  @Field()
  dateFormat!: string;
}

@ObjectType()
class AddDatabaseEntryResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => AddDatabaseEntry, { nullable: true })
  addDatabaseEntery?: AddDatabaseEntry;
}

const validateDefaultValue = (defaultValues: string): true | FieldError => {
  try {
    JSON.parse(defaultValues);
  } catch (e) {
    return {
      field: "defaultValues",
      message: "default values are not a valid JSON",
    };
  }
  return true;
};

const validateAddDatabaseEntry = async (
  { userId, dateFormat, defaultValues }: AddDatabaseEntryData,
  em: MyContext["em"]
): Promise<FieldError[] | true> => {
  const errors: FieldError[] = [];
  const user = await em.findOne(User, { id: userId });
  if (!user) {
    errors.push({ field: "userId", message: "user not found" });
  }
  const dateFormatError = validateDateFormat(dateFormat, "dateFormat");
  if (dateFormatError !== true) {
    errors.push(dateFormatError);
  }
  const defaultValueError = validateDefaultValue(defaultValues);
  if (defaultValueError !== true) {
    errors.push(defaultValueError);
  }
  return errors.length ? errors : true;
};

@Resolver()
export class AddDatabaseEnteryResolver {
  @Query(() => [AddDatabaseEntry])
  addDatabaseEnteryUserActions(
    @Arg("userId", () => Number) userId: number,
    @Ctx() { em }: MyContext
  ): Promise<AddDatabaseEntry[]> {
    return em.find(AddDatabaseEntry, { userId, deleted: false });
  }

  @Query(() => AddDatabaseEntry, { nullable: true })
  addDatabaseEnteryAction(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<AddDatabaseEntry | null> {
    return em.findOne(AddDatabaseEntry, { id, deleted: false });
  }

  @Mutation(() => AddDatabaseEntryResponse)
  async createAddDatabaseEntery(
    @Arg("addDatabaseEntryData")
    addDatabaseEntery: AddDatabaseEntryData,
    @Ctx() { em }: MyContext
  ): Promise<AddDatabaseEntryResponse> {
    const errors = await validateAddDatabaseEntry(addDatabaseEntery, em);
    if (errors !== true) {
      return { errors };
    }
    const createdAction = em.create(AddDatabaseEntry, {
      ...addDatabaseEntery,
    });
    try {
      await em.persistAndFlush(createdAction);
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

    return { addDatabaseEntery: createdAction };
  }

  @Mutation(() => AddDatabaseEntry, { nullable: true })
  async updateAddDatabaseEnteryDateFormat(
    @Arg("id") id: number,
    dateFormat: string,
    @Ctx() { em }: MyContext
  ): Promise<AddDatabaseEntryResponse | null> {
    const addDatabaseEnteryToUpdate = await em.findOne(AddDatabaseEntry, {
      id,
      deleted: false,
    });
    if (!addDatabaseEnteryToUpdate) {
      return null;
    }

    const dateFormatError = validateDateFormat(dateFormat, "dateFormat");
    if (dateFormatError !== true) {
      return { errors: [dateFormatError] };
    }

    await em.persistAndFlush({
      ...addDatabaseEnteryToUpdate,
      dateFormat,
    });

    return {
      addDatabaseEntery: { ...addDatabaseEnteryToUpdate, dateFormat },
    };
  }

  @Mutation(() => AddDatabaseEntry, { nullable: true })
  async updateAddDatabaseEnteryDefaultValues(
    @Arg("id") id: number,
    defaultValues: string,
    @Ctx() { em }: MyContext
  ): Promise<AddDatabaseEntryResponse | null> {
    const addDatabaseEnteryToUpdate = await em.findOne(AddDatabaseEntry, {
      id,
      deleted: false,
    });
    if (!addDatabaseEnteryToUpdate) {
      return null;
    }

    const dateFormatError = validateDefaultValue(defaultValues);
    if (dateFormatError !== true) {
      return { errors: [dateFormatError] };
    }

    await em.persistAndFlush({
      ...addDatabaseEnteryToUpdate,
      defaultValues,
    });

    return {
      addDatabaseEntery: { ...addDatabaseEnteryToUpdate, defaultValues },
    };
  }

  @Mutation(() => AddDatabaseEntry, { nullable: true })
  async updateAddDatabaseEnterydateFileNamInNotion(
    @Arg("id") id: number,
    dateFiledNameInNotion: string,
    @Ctx() { em }: MyContext
  ): Promise<AddDatabaseEntryResponse | null> {
    const addDatabaseEnteryToUpdate = await em.findOne(AddDatabaseEntry, {
      id,
      deleted: false,
    });
    if (!addDatabaseEnteryToUpdate) {
      return null;
    }

    await em.persistAndFlush({
      ...addDatabaseEnteryToUpdate,
      dateFiledNameInNotion,
    });

    return {
      addDatabaseEntery: {
        ...addDatabaseEnteryToUpdate,
        dateFiledNameInNotion,
      },
    };
  }

  @Mutation(() => AddDatabaseEntry, { nullable: true })
  async deleteAddDatabaseEnteryDateFormat(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<AddDatabaseEntryResponse | null> {
    const addDatabaseEnteryToUpdate = await em.findOne(AddDatabaseEntry, {
      id,
      deleted: false,
    });
    if (!addDatabaseEnteryToUpdate) {
      return null;
    }

    await em.persistAndFlush({
      ...addDatabaseEnteryToUpdate,
      deleted: true,
      deletedDate: new Date(),
    });

    return {};
  }

  @Mutation(() => AddDatabaseEntry, { nullable: true })
  async updateAddDatabaseEntery(
    @Arg("id") id: number,
    addDatabaseEntery: AddDatabaseEntryData,
    @Ctx() { em }: MyContext
  ): Promise<AddDatabaseEntryResponse | null> {
    const addDatabaseEnteryToUpdate = await em.findOne(AddDatabaseEntry, {
      id,
      deleted: false,
    });
    if (!addDatabaseEnteryToUpdate) {
      return null;
    }
    const errors = await validateAddDatabaseEntry(addDatabaseEntery, em);
    if (errors !== true) {
      return { errors };
    }
    await em.persistAndFlush({
      ...addDatabaseEnteryToUpdate,
      ...addDatabaseEntery,
    });

    return {
      addDatabaseEntery: { ...addDatabaseEnteryToUpdate, ...addDatabaseEntery },
    };
  }
}
