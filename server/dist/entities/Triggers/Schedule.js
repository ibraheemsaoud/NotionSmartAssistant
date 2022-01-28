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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = exports.TriggerCondition = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
var TriggerCondition;
(function (TriggerCondition) {
    TriggerCondition[TriggerCondition["DAILY"] = 0] = "DAILY";
    TriggerCondition[TriggerCondition["WEEKLY"] = 1] = "WEEKLY";
    TriggerCondition[TriggerCondition["MONTHLY"] = 2] = "MONTHLY";
    TriggerCondition[TriggerCondition["NthDayOfTheMonth"] = 3] = "NthDayOfTheMonth";
})(TriggerCondition = exports.TriggerCondition || (exports.TriggerCondition = {}));
(0, type_graphql_1.registerEnumType)(TriggerCondition, {
    name: "TriggerCondition",
});
let Schedule = class Schedule {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deleted = false;
        this.deletedDate = new Date();
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: "date" }),
    __metadata("design:type", Object)
], Schedule.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: "date", onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], Schedule.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Schedule.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Enum)(() => TriggerCondition),
    __metadata("design:type", Number)
], Schedule.prototype, "triggerCondition", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)({ type: "text" }),
    __metadata("design:type", String)
], Schedule.prototype, "triggerTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Boolean]),
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Array)
], Schedule.prototype, "daysOfTheWeek", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Number)
], Schedule.prototype, "monthFrequency", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Schedule.prototype, "deleted", void 0);
__decorate([
    (0, core_1.Property)({ type: "date" }),
    __metadata("design:type", Object)
], Schedule.prototype, "deletedDate", void 0);
Schedule = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], Schedule);
exports.Schedule = Schedule;
//# sourceMappingURL=Schedule.js.map