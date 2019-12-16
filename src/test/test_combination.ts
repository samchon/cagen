import { HashSet } from "tstl/container/HashSet";
import { Vector } from "tstl/container/Vector";
import { is_sorted } from "tstl/algorithm/sorting";
import { randint } from "tstl/algorithm/random";

import { Combination } from "../generators/Combination";
import { UniqueElements } from "./internal/UniqueElements";

function compute_size(n: number, r: number): number
{
    let ret: number = 1;
    for (let i: number = 0; i < r; ++i)
        ret *= (n-i) / (i+1);
    
    return ret;
}

export function test_combination(): void
{
    let n: number = randint(4, 8);
    let r: number = randint(3, n);
    let generator: Combination = new Combination(n, r);

    if (generator.size() !== compute_size(n, r))
        throw new Error("Error on Combination: wrong size");

    let unique: UniqueElements = new UniqueElements();
    let i: number = 0;

    for (let elements of generator)
    {
        if (++i > generator.size())
            throw new Error("Error on Combination: exceeds its origin size on iteration");

        let s: HashSet<number> = new HashSet(elements);
        let v: Vector<number> = Vector.wrap(elements);

        if (s.size() !== elements.length)
            throw new Error("Error on Combination: generated elements are not unique");
        else if (is_sorted(v.begin(), v.end()) === false)
            throw new Error("Error on Combination: elements are wrong, not sorted");

        unique.insert(elements);
    }
    if (unique.size() !== generator.size())
        throw new Error("Error on Combination: indexes are not unique");
}