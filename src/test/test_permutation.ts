import { HashSet } from "tstl/container/HashSet";
import { randint } from "tstl/algorithm/random";

import { UniqueElements } from "./internal/UniqueElements";
import { Permutation } from "../generators/Permutation";

export function test_permutation(): void
{
    let n: number = randint(4, 8);
    let r: number = randint(3, n);
    let generator: Permutation = new Permutation(n, r);

    let unique: UniqueElements = new UniqueElements();
    let i: number = 0;
    
    for (let elements of generator)
    {
        if (++i > generator.size())
            throw new Error("Error on Permutation: iteration exceeds its origin size");

        let s: HashSet<number> = new HashSet(elements);
        if (s.size() !== elements.length)
            throw new Error("Error on Permutation: generate elements are not unique");

        unique.insert(elements);
    }
    if (unique.size() !== generator.size())
        throw new Error("Error on Permutation: indexes are not unique");
}