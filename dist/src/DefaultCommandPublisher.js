"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultCommandPublisher {
    constructor(subject) {
        this.subject = subject;
    }
    publish(command) {
        this.subject.next(command);
    }
}
exports.default = DefaultCommandPublisher;
