import { ArrayGenerator } from "../base/ArrayGenerator";

/**
 * A permutation case generator.
 * 
 * <sub>n</sub>P<sub>r</sub>
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class Permutation 
	extends ArrayGenerator<Permutation> 
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

		this.n_ = n;
		this.r_ = r;
		
		this.size_ = n;
		for (let i: number = n - 1; i > n - r; i--)
			this.size_ *= i;
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
	 * Get N, number of candidates.
	 */
	public n(): number
	{
		return this.n_;
	}

	/**
	 * Get R, number of elements for each case.
	 */
	public r(): number
	{
		return this.r_;
	}

	/* -----------------------------------------------------------
		COMPUTATION
	----------------------------------------------------------- */
	/**
	 * @inheritdoc
	 */
	public at(index: number): Array<number>
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
}