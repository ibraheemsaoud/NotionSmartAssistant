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
exports.AddDatabaseEnteryResolver = void 0;
const User_1 = require("../../entities/User");
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../../entities");
const types_1 = require("../types");
const validations_1 = require("../validations");
let AddDatabaseEntryData = class AddDatabaseEntryData {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AddDatabaseEntryData.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddDatabaseEntryData.prototype, "databaseId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddDatabaseEntryData.prototype, "defaultValues", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddDatabaseEntryData.prototype, "dateFiledNameInNotion", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddDatabaseEntryData.prototype, "dateFormat", void 0);
AddDatabaseEntryData = __decorate([
    (0, type_graphql_1.InputType)()
], AddDatabaseEntryData);
let AddDatabaseEntryResponse = class AddDatabaseEntryResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [types_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], AddDatabaseEntryResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => entities_1.AddDatabaseEntry, { nullable: true }),
    __metadata("design:type", entities_1.AddDatabaseEntry)
], AddDatabaseEntryResponse.prototype, "addDatabaseEntery", void 0);
AddDatabaseEntryResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AddDatabaseEntryResponse);
const validateDefaultValue = (defaultValues) => {
    try {
        JSON.parse(defaultValues);
    }
    catch (e) {
        return {
            field: "defaultValues",
            message: "default values are not a valid JSON",
        };
    }
    return true;
};
const validateAddDatabaseEntry = ({ userId, dateFormat, defaultValues }, em) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const user = yield em.findOne(User_1.User, { id: userId });
    if (!user) {
        errors.push({ field: "userId", message: "user not found" });
    }
    const dateFormatError = (0, validations_1.validateDateFormat)(dateFormat, "dateFormat");
    if (dateFormatError !== true) {
        errors.push(dateFormatError);
    }
    const defaultValueError = validateDefaultValue(defaultValues);
    if (defaultValueError !== true) {
        errors.push(defaultValueError);
    }
    return errors.length ? errors : true;
});
let AddDatabaseEnteryResolver = class AddDatabaseEnteryResolver {
    addDatabaseEnteryUserActions(userId, { em }) {
        return em.find(entities_1.AddDatabaseEntry, { userId, deleted: false });
    }
    addDatabaseEnteryAction(id, { em }) {
        return em.findOne(entities_1.AddDatabaseEntry, { id, deleted: false });
    }
    createAddDatabaseEntery(addDatabaseEntery, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield validateAddDatabaseEntry(addDatabaseEntery, em);
            if (errors !== true) {
                return { errors };
            }
            const createdAction = em.create(entities_1.AddDatabaseEntry, Object.assign({}, addDatabaseEntery));
            try {
                yield em.persistAndFlush(createdAction);
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
            return { addDatabaseEntery: createdAction };
        });
    }
    updateAddDatabaseEnteryDateFormat(id, dateFormat, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const addDatabaseEnteryToUpdate = yield em.findOne(entities_1.AddDatabaseEntry, {
                id,
                deleted: false,
            });
            if (!addDatabaseEnteryToUpdate) {
                return null;
            }
            const dateFormatError = (0, validations_1.validateDateFormat)(dateFormat, "dateFormat");
            if (dateFormatError !== true) {
                return { errors: [dateFormatError] };
            }
            yield em.persistAndFlush(Object.assign(Object.assign({}, addDatabaseEnteryToUpdate), { dateFormat }));
            return {
                addDatabaseEntery: Object.assign(Object.assign({}, addDatabaseEnteryToUpdate), { dateFormat }),
            };
        });
    }
    updateAddDatabaseEnteryDefaultValues(id, defaultValues, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const addDatabaseEnteryToUpdate = yield em.findOne(entities_1.AddDatabaseEntry, {
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
            yield em.persistAndFlush(Object.assign(Object.assign({}, addDatabaseEnteryToUpdate), { defaultValues }));
            return {
                addDatabaseEntery: Object.assign(Object.assign({}, addDatabaseEnteryToUpdate), { defaultValues }),
            };
        });
    }
    updateAddDatabaseEnterydateFileNamInNotion(id, dateFiledNameInNotion, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const addDatabaseEnteryToUpdate = yield em.findOne(entities_1.AddDatabaseEntry, {
                id,
                deleted: false,
            });
            if (!addDatabaseEnteryToUpdate) {
                return null;
            }
            yield em.persistAndFlush(Object.assign(Object.assign({}, addDatabaseEnteryToUpdate), { dateFiledNameInNotion }));
            return {
                addDatabaseEntery: Object.assign(Object.assign({}, addDatabaseEnteryToUpdate), { dateFiledNameInNotion }),
            };
        });
    }
    deleteAddDatabaseEnteryDateFormat(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const addDatabaseEnteryToUpdate = yield em.findOne(entities_1.AddDatabaseEntry, {
                id,
                deleted: false,
            });
            if (!addDatabaseEnteryToUpdate) {
                return null;
            }
            yield em.persistAndFlush(Object.assign(Object.assign({}, addDatabaseEnteryToUpdate), { deleted: true, deletedDate: new Date() }));
            return {};
        });
    }
    updateAddDatabaseEntery(id, addDatabaseEntery, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const addDatabaseEnteryToUpdate = yield em.findOne(entities_1.AddDatabaseEntry, {
                id,
                deleted: false,
            });
            if (!addDatabaseEnteryToUpdate) {
                return null;
            }
            const errors = yield validateAddDatabaseEntry(addDatabaseEntery, em);
            if (errors !== true) {
                return { errors };
            }
            yield em.persistAndFlush(Object.assign(Object.assign({}, addDatabaseEnteryToUpdate), addDatabaseEntery));
            return {
                addDatabaseEntery: Object.assign(Object.assign({}, addDatabaseEnteryToUpdate), addDatabaseEntery),
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [entities_1.AddDatabaseEntry]),
    __param(0, (0, type_graphql_1.Arg)("userId", () => Number)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AddDatabaseEnteryResolver.prototype, "addDatabaseEnteryUserActions", null);
__decorate([
    (0, type_graphql_1.Query)(() => entities_1.AddDatabaseEntry, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AddDatabaseEnteryResolver.prototype, "addDatabaseEnteryAction", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AddDatabaseEntryResponse),
    __param(0, (0, type_graphql_1.Arg)("addDatabaseEntryData")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddDatabaseEntryData, Object]),
    __metadata("design:returntype", Promise)
], AddDatabaseEnteryResolver.prototype, "createAddDatabaseEntery", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.AddDatabaseEntry, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], AddDatabaseEnteryResolver.prototype, "updateAddDatabaseEnteryDateFormat", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.AddDatabaseEntry, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], AddDatabaseEnteryResolver.prototype, "updateAddDatabaseEnteryDefaultValues", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.AddDatabaseEntry, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], AddDatabaseEnteryResolver.prototype, "updateAddDatabaseEnterydateFileNamInNotion", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.AddDatabaseEntry, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AddDatabaseEnteryResolver.prototype, "deleteAddDatabaseEnteryDateFormat", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.AddDatabaseEntry, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, AddDatabaseEntryData, Object]),
    __metadata("design:returntype", Promise)
], AddDatabaseEnteryResolver.prototype, "updateAddDatabaseEntery", null);
AddDatabaseEnteryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AddDatabaseEnteryResolver);
exports.AddDatabaseEnteryResolver = AddDatabaseEnteryResolver;
//# sourceMappingURL=addDatabaseEntery.js.map