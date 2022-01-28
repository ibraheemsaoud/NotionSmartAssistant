"use strict";
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
exports.Migration20220124235216 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220124235216 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('alter table "automations" add column "deleted" bool not null, add column "deleted_date" timestamptz(0) not null, add column "disabled" bool not null;');
            this.addSql('alter table "schedule" add column "deleted" bool not null, add column "deleted_date" timestamptz(0) not null;');
        });
    }
}
exports.Migration20220124235216 = Migration20220124235216;
//# sourceMappingURL=Migration20220124235216.js.map