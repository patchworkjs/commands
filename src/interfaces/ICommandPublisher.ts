import {ICommand} from "./ICommand";

export default interface ICommandPublisher<CommandBase extends ICommand = ICommand> {
    publish<T extends CommandBase = CommandBase>(command: T): any;
  }
