import { InvalidArgument } from "tstl/exception/InvalidArgument";

/**
 * @internal
 */
export namespace Validator
{
    export function initializer(this: any, n: number, r: number): void
    {
        if (n <= 0 || r <= 0 || Math.floor(n) !== n || Math.floor(r) !== r)
            throw new InvalidArgument(`Error on ${this.constructor.name}.constructor(): both n and r must be positive integer -> (n = ${n}, r = ${r})`);
    }
}