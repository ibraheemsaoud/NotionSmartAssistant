"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerTypes = void 0;
const type_graphql_1 = require("type-graphql");
__exportStar(require("./Schedule"), exports);
var TriggerTypes;
(function (TriggerTypes) {
    TriggerTypes[TriggerTypes["SCHEDULE"] = 0] = "SCHEDULE";
})(TriggerTypes = exports.TriggerTypes || (exports.TriggerTypes = {}));
(0, type_graphql_1.registerEnumType)(TriggerTypes, {
    name: "TriggerTypes",
});
//# sourceMappingURL=index.js.map