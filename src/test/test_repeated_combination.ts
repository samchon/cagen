import { randint } from "tstl/algorithm/random";

import { UniqueElements } from "./internal/UniqueElements";
import { RepeatedCombination } from "../generators/RepeatedCombination";

export function test_repeated_combinations(): void
{
    let n: number = randint(4, 8);
    let r: number = randint(3, n);
    let generator: RepeatedCombination = new RepeatedCombination(n, r);

    let unique: UniqueElements = new UniqueElements();
    let i: number = 0;

    for (let elements of generator)
    {
        if (++i > generator.size())
            throw new Error("Error on RepeatedCombination: exceeds its origin size on iteration");
        unique.insert(elements);
    }
    if (unique.size() !== generator.size())
        throw new Error("Error on RepeatedCombination: indexes are not unique");
}