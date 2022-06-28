export default class InvalidCommandHandlerException extends Error {
    constructor() {
      super(
        `There is no register Command for CommandHandler!`,
      );
    }
  }