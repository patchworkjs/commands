"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandHandlerNotFoundException extends Error {
    constructor(commandName) {
        super(`The command handler for the "${commandName}" command was not found!`);
    }
}
exports.default = CommandHandlerNotFoundException;
