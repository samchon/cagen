//================================================================ 
/** @module cagen */
//================================================================
import { ArrayGenerator } from "../base/ArrayGenerator";
import { ICandidate } from "../base/ICandidate";

/**
 * Permutation generator.
 * 
 * <sub>n</sub>P<sub>r</sub>
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Permutation
    extends ArrayGenerator<Permutation> 
    implements ICandidate
{
    private n_: number;
    private r_: number;
    private size_: number;

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
        this.size_ = Permutation.size(n, r);
    }

    /* -----------------------------------------------------------
        ACCESSORS
    ----------------------------------------------------------- */
    /**
     * @inheritdoc
     */
    public size(): number
    {
        return this.size_;
    }

    /**
     * @inheritdoc
     */
    public n(): number
    {
        return this.n_;
    }

    /**
     * @inheritdoc
     */
    public r(): number
    {
        return this.r_;
    }

    /**
     * @inheritdoc
     */
    public equals(obj: Permutation): boolean
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
        let atoms: Array<number> = [];
        for (let i: number = 0; i < this.n_; i++)
            atoms.push(i);

        let row: Array<number> = [];

        for (let i: number = 0; i < this.r_; i++)
        {
            let item: number = index % atoms.length;
            index = Math.floor(index / atoms.length);

            row.push( atoms[item] );
            atoms.splice(item, 1);
        }
        return row;
    }
}

export namespace Permutation
{
    /**
     * Iterator of {@link Permutation}.
     */
    export type Iterator = ArrayGenerator.Iterator<Permutation>;

    /**
     * Reverse iterator of {@link Permutation}.
     */
	export type ReverseIterator = ArrayGenerator.ReverseIterator<Permutation>;
    
    /**
     * Compute number of cases when {@link Permutation}.
     * 
     * @param n Number of candidates.
     * @param r Number of elements in each case.
     * @return Computed number of cases.
     */
	export function size(n: number, r: number): number
	{
		let ret: number = n;
        for (let i: number = n - 1; i > n - r; i--)
			ret *= i;
			
		return ret;
	}
}