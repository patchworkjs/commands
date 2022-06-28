export default class CommandHandlerNotFoundException extends Error {
    constructor(commandName: string);
}
