import ObservableBus from "./ObservableBus";
import ICommand from "./interfaces/ICommand.interface";
import ICommandBus from "./interfaces/ICommandBus.interface";
import ICommandHandler from "./interfaces/ICommandHandler.interface";
import ICommandPublisher from "./interfaces/ICommandPublisher.interface";
export interface Type<T = any> extends Function {
    new (...args: any[]): T;
}
export declare type CommandHandlerType = Type<ICommandHandler<ICommand>>;
export declare class CommandBus<CommandBase extends ICommand = ICommand> extends ObservableBus<CommandBase> implements ICommandBus<CommandBase> {
    private handlers;
    private props;
    constructor();
    get publisher(): ICommandPublisher<CommandBase>;
    set publisher(publisher: ICommandPublisher<CommandBase>);
    execute<T extends CommandBase, R = any>(command: T): Promise<R>;
    private getCommandId;
    bind<T extends CommandBase>(handler: ICommandHandler<T>, id: string): void;
    register(handlers?: ICommandHandler[]): void;
    protected registerHandler(handler: ICommandHandler): void;
    private reflectCommandId;
}
