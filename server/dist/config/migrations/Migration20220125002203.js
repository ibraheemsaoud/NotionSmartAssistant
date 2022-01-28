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
exports.Migration20220125002203 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220125002203 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('alter table "automations" rename column "automation_type" to "action_type";');
            this.addSql('alter table "automations" add column "action_id" int4 not null;');
            this.addSql('alter table "automations" drop constraint if exists "automations_user_id_check";');
            this.addSql('alter table "automations" alter column "user_id" type int4 using ("user_id"::int4);');
            this.addSql('alter table "automations" drop constraint if exists "automations_trigger_id_check";');
            this.addSql('alter table "automations" alter column "trigger_id" type int4 using ("trigger_id"::int4);');
            this.addSql('alter table "automations" drop column "automation_id";');
            this.addSql('alter table "add_database_entry" drop constraint if exists "add_database_entry_user_id_check";');
            this.addSql('alter table "add_database_entry" alter column "user_id" type int4 using ("user_id"::int4);');
        });
    }
}
exports.Migration20220125002203 = Migration20220125002203;
//# sourceMappingURL=Migration20220125002203.js.map