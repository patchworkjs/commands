import { Subject } from 'rxjs';
import ICommandPublisher from './interfaces/ICommandPublisher';
import {ICommand} from './interfaces/ICommand'; 

export  class DefaultCommandPublisher<CommandBase extends ICommand>
  implements ICommandPublisher<CommandBase> {
  constructor(private subject: Subject<CommandBase>) {}

  publish<T extends CommandBase>(command: T) {
    this.subject.next(command);
  }
}