import { InvalidArgument } from "tstl/exception/InvalidArgument";

export interface INR
{
    /**
     * Get N, number of candidates.
     */
    n(): number;
    
    /**
     * Get R, number of elements for each case.
     */
    r(): number;
}

export namespace INR
{
    /**
     * @internal
     */
    export function validate(this: any, n: number, r: number): void
    {
        if (n <= 0 || r <= 0 || Math.floor(n) !== n || Math.floor(r) !== r)
            throw new InvalidArgument(`Error on ${this.constructor.name}.constructor(): both n and r must be positive integer -> (n = ${n}, r = ${r})`);
    }

    /**
     * @internal
     */
    export function equal_to(x: INR, y: INR): boolean
    {
        return x.n() === y.n() && x.r() === y.r();
    }
}