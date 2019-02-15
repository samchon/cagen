import { ICaseGenerator } from "../base/ICaseGenerator";

import { CombinationIterator } from "../combinates/CombinationIterator";
import { CombinationReverseIterator } from "../combinates/CombinationReverseIterator";
import { CombinationForOfAdaptor } from "../combinates/CombinationForOfAdaptor";

import { Vector } from "tstl/container/Vector";
import { BitMask } from "../combinates/BitMask";

export class Combination 
	implements ICaseGenerator<Combination, Combination.Iterator, Combination.ReverseIterator>
{
	private n_: number;
	private r_: number;
	private size_: number;

	private bit_mask_: BitMask;
	private begin_: Combination.Iterator;
	private end_: Combination.Iterator;

	/* ---------------------------------------------------------
		CONSTRUCTOR
	--------------------------------------------------------- */
	public constructor(n: number, r: number)
	{
		// BASIC MEMBERS
		this.n_ = n;
		this.r_ = r;
		this.size_ = 1;

		for (let i: number = 0; i < r; ++i)
			this.size_ *= (n-i) / (i+1);

		this.bit_mask_ = new Vector(r, true);
		this.bit_mask_.insert(this.bit_mask_.end(), n - r, false);

		// ITERATORS
		this.begin_ = new Combination.Iterator(this, this.bit_mask_);
		this.end_ = new Combination.Iterator(this, null!);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public size(): number
	{
		return this.size_;
	}
	public n(): number
	{
		return this.n_;
	}
	public r(): number
	{
		return this.r_;
	}

	/* ---------------------------------------------------------
		ITERATORS
	--------------------------------------------------------- */
	public begin(): Combination.Iterator
	{
		return this.begin_;
	}
	public end(): Combination.Iterator
	{
		return this.end_;
	}

	public rbegin(): Combination.ReverseIterator
	{
		return this.end_.reverse();
	}
	public rend(): Combination.ReverseIterator
	{
		return this.begin_.reverse();
	}

	public [Symbol.iterator](): IterableIterator<Array<number>>
	{
		return new CombinationForOfAdaptor(this.bit_mask_);
	}
}

export namespace Combination
{
	export type Iterator = CombinationIterator;
	export type ReverseIterator = CombinationReverseIterator;

	export var Iterator = CombinationIterator;
	export var ReverseIterator = CombinationReverseIterator;
}