import 'reflect-metadata';

import { COMMAND_HANDLER_METADATA, COMMAND_METADATA } from '../Consts';
import { v4 } from 'uuid';
import {ICommand} from '../interfaces/ICommand';

export const CommandHandlerDecorator = (command: ICommand): ClassDecorator => {
  return (target: object) => {
    if (!Reflect.hasMetadata(COMMAND_METADATA, command)) {
      Reflect.defineMetadata(COMMAND_METADATA, { id: v4() }, command);
    }
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, target);
  };
};

