"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Consts_1 = require("../Consts");
const uuid_1 = require("uuid");
const CommandHandler = (command) => {
    return (target) => {
        if (!Reflect.hasMetadata(Consts_1.COMMAND_METADATA, command)) {
            Reflect.defineMetadata(Consts_1.COMMAND_METADATA, { id: (0, uuid_1.v4)() }, command);
        }
        Reflect.defineMetadata(Consts_1.COMMAND_HANDLER_METADATA, command, target);
    };
};
exports.default = CommandHandler;
