import * as std from "tstl";

import { ICaseIterator } from "../base/ICaseIterator";

import { ArrayGenerator } from "./ArrayGenerator";
import { ArrayReverseIterator } from "./ArrayReverseIterator";

export class ArrayIterator<Source extends ArrayGenerator<Source>>
	implements ICaseIterator<Source, ArrayIterator<Source>, ArrayReverseIterator<Source>>,
		std.IRandomAccessIterator<Array<number>, ArrayIterator<Source>>
{
	private source_: Source;
	private index_: number;

	public constructor(source: Source, index: number)
	{
		this.source_ = source;
		this.index_ = index;
	}

	public reverse(): ArrayReverseIterator<Source>
	{
		return new ArrayReverseIterator(this);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public source(): Source
	{
		return this.source_;
	}

	public index(): number
	{
		return this.index_;
	}

	public get value(): Array<number>
	{
		return this.source_.at(this.index_);
	}

	public equals(obj: ArrayIterator<Source>): boolean
	{
		return this.index_ === obj.index_ 
			&& std.equal_to(this.source_, obj.source_);
	}

	/* ---------------------------------------------------------
		MOVERS
	--------------------------------------------------------- */
	public prev(): ArrayIterator<Source>
	{
		return new ArrayIterator(this.source_, this.index_ - 1);
	}

	public next(): ArrayIterator<Source>
	{
		return new ArrayIterator(this.source_, this.index_ + 1);
	}

	public advance(n: number): ArrayIterator<Source>
	{
		return new ArrayIterator(this.source_, this.index_ + n);
	}
}