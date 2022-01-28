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
exports.AddDatabaseEntry = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
let AddDatabaseEntry = class AddDatabaseEntry {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deleted = false;
        this.deletedDate = new Date();
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], AddDatabaseEntry.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: "date" }),
    __metadata("design:type", Object)
], AddDatabaseEntry.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: "date", onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], AddDatabaseEntry.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], AddDatabaseEntry.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], AddDatabaseEntry.prototype, "databaseId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], AddDatabaseEntry.prototype, "defaultValues", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], AddDatabaseEntry.prototype, "dateFiledNameInNotion", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], AddDatabaseEntry.prototype, "dateFormat", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], AddDatabaseEntry.prototype, "deleted", void 0);
__decorate([
    (0, core_1.Property)({ type: "date" }),
    __metadata("design:type", Object)
], AddDatabaseEntry.prototype, "deletedDate", void 0);
AddDatabaseEntry = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], AddDatabaseEntry);
exports.AddDatabaseEntry = AddDatabaseEntry;
//# sourceMappingURL=AddDatabaseEntery.js.map