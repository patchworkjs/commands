import "jest";
import {DefaultCommandPublisher} from "../../src/DefaultCommandPublisher"
import {ICommand} from "../../src/interfaces/ICommand"
import {CommandBus} from "../../src/CommandBus";


class TestCommand implements ICommand {
    constructor(public readonly value: string) {}
  }
  
describe("DefaultCommandPublisher", () => {
    test("publish", async () => {
      
        const testCommand= new TestCommand("test");
        const commandBus = new CommandBus();
        const defaultCommandPublisher=new DefaultCommandPublisher(commandBus);
        expect(() =>defaultCommandPublisher.publish(testCommand)).not.toThrow();
    });
  
  });
  