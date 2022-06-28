import ICommand from "./ICommand.interface";
export default interface ICommandHandler<TCommand extends ICommand = any, TResult = any> {
    execute(command: TCommand): Promise<TResult>;
}
