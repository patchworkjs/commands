"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class ObservableBus extends rxjs_1.Subject {
    constructor() {
        super();
    }
}
exports.default = ObservableBus;
