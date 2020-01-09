//================================================================ 
/** @module cagen */
//================================================================
import { ArrayGenerator } from "../base/ArrayGenerator";
import { ICandidate } from "../base/ICandidate";

/**
 * Repeated-permutation generator.
 * 
 * <sub>n</sub>∏<sub>r</sub>
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class RepeatedPermutation 
    extends ArrayGenerator<RepeatedPermutation>
    implements ICandidate
{
    private size_: number;
    private n_: number;
    private r_: number;
    
    private dividers_: Array<number>;

    /* ---------------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * @param n Number of candidates.
     * @param r Number of elements in each case.
     */
    public constructor(n: number, r: number)
    {
        super();
        ICandidate.validate.bind(this)(n, r);

        this.n_ = n;
        this.r_ = r;
        this.size_ = RepeatedPermutation.size(n, r);

        this.dividers_ = [];
        for (let i: number = 0; i < r; i++)
        {
            let x: number = r - (i + 1);
            let val: number = Math.pow(n, x);

            this.dividers_.push(val);
        }
    }

    /* -----------------------------------------------------------
        ACCESSORS
    ----------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public size(): number
    {
        return this.size_;
    }

    /**
     * @inheritDoc
     */
    public n(): number
    {
        return this.n_;
    }

    /**
     * @inheritDoc
     */
    public r(): number
    {
        return this.r_;
    }

    /**
     * @inheritDoc
     */
    public equals(obj: RepeatedPermutation): boolean
    {
        return ICandidate.equal_to(this, obj);
    }

    /* -----------------------------------------------------------
        COMPUTATION
    ----------------------------------------------------------- */
    /**
     * @hidden
     */
    protected _At(index: number): Array<number>
    {
        let row: Array<number> = [];
        for (let i: number = 0; i < this.r_; i++)
        {
            let val: number = Math.floor(index / this.dividers_[i]) % this.n_;
            row.push(val);
        }
        return row;
    }
}

export namespace RepeatedPermutation
{
    /**
     * Iterator of {@link RepeatedPermutation}.
     */
    export type Iterator = ArrayGenerator.Iterator<RepeatedPermutation>;

    /**
     * Reverse iterator of {@link RepeatedPermutation}.
     */
    export type ReverseIterator = ArrayGenerator.ReverseIterator<RepeatedPermutation>;

    /**
     * Compute number of cases when {@link RepeatedPermutation}.
     * 
     * @param n Number of candidates.
     * @param r Number of elements in each case.
     * @return Computed number of cases.
     */
    export function size(n: number, r: number): number
    {
        return Math.pow(n, r);
    }
}