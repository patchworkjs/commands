import { Observable, Subject } from 'rxjs';


export default class ObservableBus<T> extends Subject<T> {
  constructor() {
    super();
  }

}