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
exports.AutomationResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../entities");
const types_1 = require("./types");
let AutomationData = class AutomationData {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AutomationData.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AutomationData.prototype, "triggerType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AutomationData.prototype, "triggerId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AutomationData.prototype, "actionType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AutomationData.prototype, "actionId", void 0);
AutomationData = __decorate([
    (0, type_graphql_1.InputType)()
], AutomationData);
let AutomationResponse = class AutomationResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [types_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], AutomationResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => entities_1.Automations, { nullable: true }),
    __metadata("design:type", entities_1.Automations)
], AutomationResponse.prototype, "automation", void 0);
AutomationResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AutomationResponse);
const validateAutomation = ({ userId, triggerType, triggerId, actionId, actionType }, em) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const user = yield em.findOne(User_1.User, { id: userId });
    if (!user) {
        errors.push({ field: "userId", message: "user not found" });
    }
    let action = null;
    switch (actionType) {
        case entities_1.ActionTypes.ADD_DATABASE_ENTRY:
            action = yield em.findOne(entities_1.AddDatabaseEntry, { id: actionId });
            break;
        default:
            errors.push({ field: "actionType", message: "action not found" });
    }
    if (!action) {
        errors.push({ field: "actionId", message: "action not found" });
    }
    let trigger = null;
    switch (triggerType) {
        case entities_1.TriggerTypes.SCHEDULE:
            trigger = yield em.findOne(entities_1.Schedule, { id: triggerId });
            break;
        default:
            errors.push({ field: "triggerType", message: "trigger not found" });
    }
    if (!trigger) {
        errors.push({ field: "triggerId", message: "trigger not found" });
    }
    return errors.length ? errors : true;
});
let AutomationResolver = class AutomationResolver {
    automations(userId, { em }) {
        return em.find(entities_1.Automations, { userId, deleted: false });
    }
    automation(id, { em }) {
        return em.findOne(entities_1.Automations, { id, deleted: false });
    }
    createAutomation(automation, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield validateAutomation(automation, em);
            if (errors !== true) {
                return { errors };
            }
            const createdAutomation = em.create(entities_1.Automations, Object.assign({}, automation));
            try {
                yield em.persistAndFlush(createdAutomation);
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
            return { automation: createdAutomation };
        });
    }
    updateAutomation(id, automation, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const automationToUpdate = yield em.findOne(entities_1.Automations, { id, deleted: false });
            if (!automationToUpdate) {
                return null;
            }
            const errors = yield validateAutomation(automation, em);
            if (errors !== true) {
                return { errors };
            }
            yield em.persistAndFlush(Object.assign(Object.assign({}, automationToUpdate), automation));
            return { automation: Object.assign(Object.assign({}, automationToUpdate), automation) };
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [entities_1.Automations]),
    __param(0, (0, type_graphql_1.Arg)("userId", () => Number)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AutomationResolver.prototype, "automations", null);
__decorate([
    (0, type_graphql_1.Query)(() => entities_1.Automations, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AutomationResolver.prototype, "automation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AutomationResponse),
    __param(0, (0, type_graphql_1.Arg)("automationData")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AutomationData, Object]),
    __metadata("design:returntype", Promise)
], AutomationResolver.prototype, "createAutomation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.Automations, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, AutomationData, Object]),
    __metadata("design:returntype", Promise)
], AutomationResolver.prototype, "updateAutomation", null);
AutomationResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AutomationResolver);
exports.AutomationResolver = AutomationResolver;
//# sourceMappingURL=automation.js.map