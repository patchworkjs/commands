import ObservableBus from "./ObservableBus";
import {ICommand} from "./interfaces/ICommand";
import ICommandBus from "./interfaces/ICommandBus";
import {ICommandHandler} from "./interfaces/ICommandHandler";
import ICommandPublisher from "./interfaces/ICommandPublisher";
import CommandHandlerNotFoundException from "./exceptions/CommandHandlerNotFoundException";
import InvalidCommandHandlerException from "./exceptions/InvalidCommandHandlerException";
import {DefaultCommandPublisher} from "./DefaultCommandPublisher";
import { COMMAND_HANDLER_METADATA, COMMAND_METADATA } from "./Consts";
import ICommandMetadata from "./interfaces/ICommandMetadata"; 


export interface Type<T = any> extends Function {
    new (...args: any[]): T;
  }

type CommandBusProps<CommandBase> = {
  publisher: ICommandPublisher<CommandBase>;
};
export type CommandHandlerType = Type<ICommandHandler<ICommand>>;


export  class CommandBus<CommandBase extends ICommand = ICommand>
  extends ObservableBus<CommandBase>
  implements ICommandBus<CommandBase>
{
  private handlers = new Map<string, ICommandHandler<CommandBase>>();
  private props: CommandBusProps<CommandBase> ;
  

  public constructor() {
    super();
    this.props = { publisher: new DefaultCommandPublisher<CommandBase>(this)};
  }

  get publisher(): ICommandPublisher<CommandBase> {
    return this.props.publisher;
  }

  set publisher(publisher: ICommandPublisher<CommandBase>) {
    this.props.publisher = publisher;
  }

  execute<T extends CommandBase, R = any>(command: T): Promise<R> {
    
    const commandId = this.getCommandId(command);
    const handler = this.handlers.get(commandId);
    
    if (!handler) {
      throw new CommandHandlerNotFoundException(commandId);
    }
    this.next(command);
    return handler.execute(command);
  }

  private getCommandId(command: CommandBase): string {
    const { constructor: commandType } = Object.getPrototypeOf(command);
    const commandMetadata: ICommandMetadata = Reflect.getMetadata(
      COMMAND_METADATA,
      commandType
    );

    if (!commandMetadata) {
 
      throw new CommandHandlerNotFoundException(commandType.name);
    }

    return commandMetadata.id;
  }

  bind<T extends CommandBase>(handler: ICommandHandler<T>, id: string) {
    this.handlers.set(id, handler);
  }

  register(handlers: ICommandHandler[] = []) {
    handlers.forEach((handler) => this.registerHandler(handler));
  }

  protected registerHandler(handler: ICommandHandler) {
    const target = this.reflectCommandId(handler);

    if (!target) {
      throw new InvalidCommandHandlerException();
    }
    this.bind(handler, target);
  }

  private reflectCommandId(handler: ICommandHandler): string | undefined {
    const command: Type<ICommand> = Reflect.getMetadata(
      COMMAND_HANDLER_METADATA,
      handler.constructor
    );
    
    const commandMetadata: ICommandMetadata = Reflect.getMetadata(
      COMMAND_METADATA,
      command
    );
    return commandMetadata.id;
  }

  
}
