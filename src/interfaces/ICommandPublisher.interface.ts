import ICommand from "./ICommand.interface";

export default interface ICommandPublisher<CommandBase extends ICommand = ICommand> {
    publish<T extends CommandBase = CommandBase>(command: T): any;
  }
