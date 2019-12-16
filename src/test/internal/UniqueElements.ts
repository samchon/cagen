import { HashSet } from "tstl/container/HashSet";
import { hash } from "tstl/functional/hash";

export class UniqueElements extends HashSet<number[]>
{
    public constructor()
    {
        super(_Hash, _Equal);
    }
}

function _Hash(elems: number[]): number
{
    return hash(...elems);
}

function _Equal(x: number[], y: number[]): boolean
{
    if (x.length !== y.length)
        return false;

    for (let i: number = 0; i < x.length; ++i)
        if (x[i] !== y[i])
            return false;
    return true;
}