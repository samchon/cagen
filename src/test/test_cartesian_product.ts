import { randint } from "tstl/algorithm/random";
import { CartesianProduct } from "../generators/CartesianProduct";

function sum(digits: number[], elements: number[]): number
{
    let ret: number = 0;
    let multiplier: number = 1;

    for (let i: number = digits.length - 1; i >= 0; --i)
    {
        ret += elements[i] * multiplier;
        multiplier *= digits[i];
    }
    return ret;
}

export function test_cartesian_product(): void
{
    let length: number = randint(4, 8);
    let digits: number[] = [];
    let size: number = 1;

    for (let i: number = 0; i < length; ++i)
    {
        let value: number = randint(4, 8);
        digits.push(value);
        size *= value;
    }

    let generator: CartesianProduct = new CartesianProduct(...digits);
    if (size !== generator.size())
        throw new Error("Error on CartesianProduct: wrong size");

    let i: number = 0;
    for (let elements of generator)
        if (i++ !== sum(digits, elements))
            throw new Error("Error on CartesianProduct: generated indexes are wrong");
        else if (i > generator.size())
            throw new Error("Error on CartesianProduct: iteration exceeds its origin size");
}
