//================================================================ 
/** @module cagen */
//================================================================
import { Permutation } from "./Permutation";

/**
 * Factorial generator.
 * 
 * n! = <sub>n</sub>P<sub>n</sub>
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Factorial extends Permutation
{
    /**
     * Intializer Constructor.
     *
     * @param n Number of candidates.
     */
    public constructor(n: number)
    {
        super(n, n);
    }
}

export namespace Factorial
{
    /**
     * Compute number of cases when {@link Factorial}.
     * 
     * @param n Number of candidates.
     * @return Computed number of cases.
     */
    export function size(n: number): number
    {
        return Permutation.size(n, n);
    }
}