"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBus = void 0;
const ObservableBus_1 = __importDefault(require("./ObservableBus"));
const CommandHandlerNotFoundException_exception_1 = __importDefault(require("./exceptions/CommandHandlerNotFoundException.exception"));
const InvalidCommandHandlerException_exception_1 = __importDefault(require("./exceptions/InvalidCommandHandlerException.exception"));
const DefaultCommandPublisher_1 = __importDefault(require("./DefaultCommandPublisher"));
const Consts_1 = require("./Consts");
class CommandBus extends ObservableBus_1.default {
    constructor() {
        super();
        this.handlers = new Map();
        this.props = { publisher: new DefaultCommandPublisher_1.default(this) };
    }
    get publisher() {
        return this.props.publisher;
    }
    set publisher(publisher) {
        this.props.publisher = publisher;
    }
    execute(command) {
        const commandId = this.getCommandId(command);
        const handler = this.handlers.get(commandId);
        if (!handler) {
            throw new CommandHandlerNotFoundException_exception_1.default(commandId);
        }
        this.next(command);
        return handler.execute(command);
    }
    getCommandId(command) {
        const { constructor: commandType } = Object.getPrototypeOf(command);
        const commandMetadata = Reflect.getMetadata(Consts_1.COMMAND_METADATA, commandType);
        if (!commandMetadata) {
            throw new CommandHandlerNotFoundException_exception_1.default(commandType.name);
        }
        return commandMetadata.id;
    }
    bind(handler, id) {
        this.handlers.set(id, handler);
    }
    register(handlers = []) {
        handlers.forEach((handler) => this.registerHandler(handler));
    }
    registerHandler(handler) {
        const target = this.reflectCommandId(handler);
        if (!target) {
            throw new InvalidCommandHandlerException_exception_1.default();
        }
        this.bind(handler, target);
    }
    reflectCommandId(handler) {
        const command = Reflect.getMetadata(Consts_1.COMMAND_HANDLER_METADATA, handler.constructor);
        const commandMetadata = Reflect.getMetadata(Consts_1.COMMAND_METADATA, command);
        return commandMetadata.id;
    }
}
exports.CommandBus = CommandBus;
