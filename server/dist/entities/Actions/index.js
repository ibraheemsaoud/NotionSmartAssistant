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
exports.ActionTypes = void 0;
const type_graphql_1 = require("type-graphql");
__exportStar(require("./AddDatabaseEntery"), exports);
var ActionTypes;
(function (ActionTypes) {
    ActionTypes[ActionTypes["ADD_DATABASE_ENTRY"] = 0] = "ADD_DATABASE_ENTRY";
})(ActionTypes = exports.ActionTypes || (exports.ActionTypes = {}));
(0, type_graphql_1.registerEnumType)(ActionTypes, {
    name: "ActionTypes",
});
//# sourceMappingURL=index.js.map