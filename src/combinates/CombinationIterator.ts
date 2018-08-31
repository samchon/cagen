import * as std from "tstl";

import { ICaseIterator } from "../base/ICaseIterator";

import { Combination } from "../generators/Combination";
import { CombinationReverseIterator } from "./CombinationReverseIterator";
import { BitMask, convert } from "./BitMask";

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
		this.value_ = (bitMask !== null) ? convert(bitMask) : null;
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
			return std.equal(this.bit_mask_.begin(), this.bit_mask_.end(), obj.bit_mask_.begin());
	}

	/* ---------------------------------------------------------
		MOVERS
	--------------------------------------------------------- */
	public prev(): CombinationIterator
	{
		if (this.bit_mask_ === null)
		{
			// ENFORCE next_permutation
			let mask: BitMask = new std.Vector(this.source_.begin().bit_mask_);
			std.next_permutation(mask.begin(), mask.end());

			return new CombinationIterator(this.source_, mask);
		}
		else
			return this._Advance(std.next_permutation);
	}

	public next(): CombinationIterator
	{
		if (this.bit_mask_ === null)
			return this.source_.begin();
		else
			return this._Advance(std.prev_permutation);
	}

	private _Advance(func: Permutator): CombinationIterator
	{
		let mask: BitMask = new std.Vector(this.bit_mask_);
		let flag: boolean = func(mask.begin(), mask.end());

		return flag ? new CombinationIterator(this.source_, mask) : this.source_.end();
	}
}

type Permutator = (first: std.Vector.Iterator<boolean>, last: std.Vector.Iterator<boolean>) => boolean;