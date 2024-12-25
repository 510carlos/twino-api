"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
// packages/trpc/src/router.ts
var server_1 = require("@trpc/server");
var zod_1 = require("zod");
var t = server_1.initTRPC.create();
// Create the application router
exports.appRouter = t.router({
    hello: t.procedure
        .input(zod_1.z.object({ name: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return { greeting: "Hello, ".concat(input.name, "!") };
    }),
});
