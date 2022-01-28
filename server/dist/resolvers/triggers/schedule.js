"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleResolver = void 0;
const User_1 = require("../../entities/User");
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../../entities");
const types_1 = require("../types");
const enums_1 = require("../validations/enums");
let ScheduleData = class ScheduleData {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ScheduleData.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ScheduleData.prototype, "triggerCondition", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ScheduleData.prototype, "triggerTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Boolean]),
    __metadata("design:type", Array)
], ScheduleData.prototype, "daysOfTheWeek", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ScheduleData.prototype, "monthFrequency", void 0);
ScheduleData = __decorate([
    (0, type_graphql_1.InputType)()
], ScheduleData);
let ScheduleResponse = class ScheduleResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [types_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], ScheduleResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => entities_1.Schedule, { nullable: true }),
    __metadata("design:type", entities_1.Schedule)
], ScheduleResponse.prototype, "schedule", void 0);
ScheduleResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ScheduleResponse);
const validateSchedule = ({ userId, triggerCondition, triggerTime, daysOfTheWeek, monthFrequency, }, em) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const user = yield em.findOne(User_1.User, { id: userId });
    if (!user) {
        errors.push({ field: "userId", message: "user not found" });
    }
    const triggerConditionError = (0, enums_1.validateEnum)(entities_1.TriggerCondition, "triggerCondition", triggerCondition);
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
});
let ScheduleResolver = class ScheduleResolver {
    scheduleUserActions(userId, { em }) {
        return em.find(entities_1.Schedule, { userId, deleted: false });
    }
    scheduleAction(id, { em }) {
        return em.findOne(entities_1.Schedule, { id, deleted: false });
    }
    createschedule(schedule, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield validateSchedule(schedule, em);
            if (errors !== true) {
                return { errors };
            }
            const createdTrigger = em.create(entities_1.Schedule, Object.assign({}, schedule));
            try {
                yield em.persistAndFlush(createdTrigger);
            }
            catch (err) {
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
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [entities_1.Schedule]),
    __param(0, (0, type_graphql_1.Arg)("userId", () => Number)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ScheduleResolver.prototype, "scheduleUserActions", null);
__decorate([
    (0, type_graphql_1.Query)(() => entities_1.Schedule, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ScheduleResolver.prototype, "scheduleAction", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ScheduleResponse),
    __param(0, (0, type_graphql_1.Arg)("scheduleData")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ScheduleData, Object]),
    __metadata("design:returntype", Promise)
], ScheduleResolver.prototype, "createschedule", null);
ScheduleResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ScheduleResolver);
exports.ScheduleResolver = ScheduleResolver;
//# sourceMappingURL=schedule.js.map