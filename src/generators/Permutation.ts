import { ArrayGenerator } from "../base/ArrayGenerator";
import { INR } from "../base/INR";

/**
 * A permutation case generator.
 * 
 * <sub>n</sub>P<sub>r</sub>
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Permutation
    extends ArrayGenerator<Permutation> 
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
    export type Iterator = ArrayGenerator.Iterator<Permutation>;
	export type ReverseIterator = ArrayGenerator.ReverseIterator<Permutation>;
	
	export function size(n: number, r: number): number
	{
		let ret: number = n;
        for (let i: number = n - 1; i > n - r; i--)
			ret *= i;
			
		return ret;
	}
}