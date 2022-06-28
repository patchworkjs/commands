"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidCommandHandlerException extends Error {
    constructor() {
        super(`There is no register Command for CommandHandler!`);
    }
}
exports.default = InvalidCommandHandlerException;
