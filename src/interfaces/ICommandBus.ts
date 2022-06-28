import {ICommand} from "./ICommand";

export default interface ICommandBus<T>
{
    execute(command: ICommand):any

}