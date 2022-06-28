import { Subject } from 'rxjs';
import ICommandPublisher from './interfaces/ICommandPublisher.interface';
import ICommand from './interfaces/ICommand.interface';
export default class DefaultCommandPublisher<CommandBase extends ICommand> implements ICommandPublisher<CommandBase> {
    private subject;
    constructor(subject: Subject<CommandBase>);
    publish<T extends CommandBase>(command: T): void;
}
