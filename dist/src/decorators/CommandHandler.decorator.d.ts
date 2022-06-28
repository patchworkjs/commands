import 'reflect-metadata';
import ICommand from '../interfaces/ICommand.interface';
declare const CommandHandler: (command: ICommand) => ClassDecorator;
export default CommandHandler;
