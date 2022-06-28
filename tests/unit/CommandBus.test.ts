import "jest";
import { CommandBus } from "../../src/CommandBus";
import { ICommand } from "../../src/interfaces/ICommand";
import {CommandHandlerDecorator } from "../../src/decorators/CommandHandlerDecorator";
import { ICommandHandler } from "../../src/interfaces/ICommandHandler";

class TestCommand implements ICommand {
  constructor(public readonly value: string) {}
}

@CommandHandlerDecorator(TestCommand)
class TestCommandHandler implements ICommandHandler<TestCommand> {
  execute(command: TestCommand): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ value: command.value });
      }, 10);
    });
  }
}

describe("CommandBus", () => {
  test("execute", async () => {
    const value = "test";
    const command = new TestCommand(value);
    const commandHandler = new TestCommandHandler();
    const commandBus = new CommandBus();
    commandBus.register([commandHandler]);
    const result = await commandBus.execute(command);
    expect(value).toBe(result.value);
  });

  test("bind", async () => {
    const commandHandler = new TestCommandHandler();
    const commandBus = new CommandBus();
    expect(() => commandBus.bind(commandHandler, "test")).not.toThrow();
  });
});
