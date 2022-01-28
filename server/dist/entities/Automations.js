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
exports.Automations = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const _1 = require(".");
let Automations = class Automations {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deleted = false;
        this.deletedDate = new Date();
        this.disabled = false;
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Automations.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: "date" }),
    __metadata("design:type", Object)
], Automations.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: "date", onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], Automations.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Automations.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => _1.TriggerTypes),
    (0, core_1.Enum)(() => _1.TriggerTypes),
    __metadata("design:type", Number)
], Automations.prototype, "triggerType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Automations.prototype, "triggerId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => _1.ActionTypes),
    (0, core_1.Enum)(() => _1.ActionTypes),
    __metadata("design:type", Number)
], Automations.prototype, "actionType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Automations.prototype, "actionId", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Automations.prototype, "deleted", void 0);
__decorate([
    (0, core_1.Property)({ type: "date" }),
    __metadata("design:type", Object)
], Automations.prototype, "deletedDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Automations.prototype, "disabled", void 0);
Automations = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], Automations);
exports.Automations = Automations;
//# sourceMappingURL=Automations.js.map