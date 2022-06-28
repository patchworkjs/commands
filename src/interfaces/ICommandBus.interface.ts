import ICommand from "./ICommand.interface";

export default interface ICommandBus<T>
{
    execute(command: ICommand):any

}