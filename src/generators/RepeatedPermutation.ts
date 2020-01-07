import { ArrayGenerator } from "../base/ArrayGenerator";
import { INR } from "../base/INR";

/**
 * Repeated-permutation generator.
 * 
 * <sub>n</sub>��<sub>r</sub>
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class RepeatedPermutation 
    extends ArrayGenerator<RepeatedPermutation>
    implements INR
{
    /**
     * @hidden
     */
    private size_: number;

    /**
     * @hidden
     */
    private n_: number;

    /**
     * @hidden
     */
    private r_: number;

    /**
     * @hidden
     */
    private dividers_: Array<number>;

    /* ---------------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------------- */
    /**
     * Construct from size of N and R.
     * 
     * @param n Size of candidates.
     * @param r Size of elements of each case.
     */
    public constructor(n: number, r: number)
    {
        super();
        INR.validate.bind(this)(n, r);

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
        return INR.equal_to(this, obj);
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
    export type Iterator = ArrayGenerator.Iterator<RepeatedPermutation>;
    export type ReverseIterator = ArrayGenerator.ReverseIterator<RepeatedPermutation>;

    export function size(n: number, r: number): number
    {
        return Math.pow(n, r);
    }
}