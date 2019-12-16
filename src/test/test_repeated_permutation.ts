import { randint } from "tstl/algorithm/random";
import { RepeatedPermutation } from "../generators/RepeatedPermutation";

function sum(n: number, {}: number, elements: number[]): number
{
    let ret: number = 0;
    let multiplier: number = 1;

    for (let i: number = elements.length - 1; i >= 0; --i)
    {
        ret += elements[i] * multiplier;
        multiplier *= n;
    }
    return ret;
}

export function test_repeated_permutation(): void
{
    let n: number = randint(4, 8);
    let r: number = randint(3, Math.max(3, n-1));
    let generator: RepeatedPermutation = new RepeatedPermutation(n, r);

    if (generator.size() !== Math.pow(n, r))
        throw new Error("Error on RepeatedPermutation: wrong size");

    let i: number = 0;
    for (let elements of generator)
    {
        if (i++ !== sum(n, r, elements))
            throw new Error("Error on RepeatedPermutation: generated indexes are wrong");
        else if (i > generator.size())
            throw new Error("Error on RepeatedPermutation: iteration exceeds its origin size");
    }
}