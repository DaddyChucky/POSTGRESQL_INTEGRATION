import { defer, from, Observable } from "rxjs";

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export class TestHelper {

    public static asyncData<T>(data: T): Observable<T> {
        return defer(() => from(Promise.resolve(data)));
    }
}
