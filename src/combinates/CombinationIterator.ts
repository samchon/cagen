import { ICaseIterator } from "../base/ICaseIterator";

import { Combination } from "../generators/Combination";
import { CombinationReverseIterator } from "./CombinationReverseIterator";
import { BitMask, convert } from "./BitMask";

import { Vector } from "tstl/container/Vector";
import { equal } from "tstl/algorithm/iterations";
import { prev_permutation, next_permutation } from "tstl/algorithm/mathematics";

export class CombinationIterator 
	implements ICaseIterator<Combination, CombinationIterator, CombinationReverseIterator>
{
	private source_: Combination;
	private bit_mask_: BitMask;
	private value_: Array<number>;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(source: Combination, bitMask: BitMask)
	{
		this.source_ = source;
		this.bit_mask_ = bitMask;
		this.value_ = (bitMask !== null) ? convert(bitMask) : null!;
	}

	public reverse(): CombinationReverseIterator
	{
		return new CombinationReverseIterator(this);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public source(): Combination
	{
		return this.source_;
	}

	public get value(): Array<number>
	{
		return this.value_;
	}

	public equals(obj: CombinationIterator): boolean
	{
		if (this.bit_mask_ === null || obj.bit_mask_ === null)
			return this.bit_mask_ === obj.bit_mask_;
		else
			return equal(this.bit_mask_.begin(), this.bit_mask_.end(), obj.bit_mask_.begin());
	}

	/* ---------------------------------------------------------
		MOVERS
	--------------------------------------------------------- */
	public prev(): CombinationIterator
	{
		if (this.bit_mask_ === null)
		{
			// ENFORCE next_permutation
			let mask: BitMask = new Vector(this.source_.begin().bit_mask_);
			next_permutation(mask.begin(), mask.end());

			return new CombinationIterator(this.source_, mask);
		}
		else
			return this._Advance(next_permutation);
	}

	public next(): CombinationIterator
	{
		if (this.bit_mask_ === null)
			return this.source_.begin();
		else
			return this._Advance(prev_permutation);
	}

	private _Advance(func: Permutator): CombinationIterator
	{
		let mask: BitMask = new Vector(this.bit_mask_);
		let flag: boolean = func(mask.begin(), mask.end());

		return flag ? new CombinationIterator(this.source_, mask) : this.source_.end();
	}
}

type Permutator = (first: Vector.Iterator<boolean>, last: Vector.Iterator<boolean>) => boolean;