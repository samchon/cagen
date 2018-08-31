import * as std from "tstl";

import { ICaseReverseIterator } from "../base/ICaseReverseIterator";

import { ArrayGenerator } from "./ArrayGenerator";
import { ArrayIterator } from "./ArrayIterator";

export class ArrayReverseIterator<Source extends ArrayGenerator<Source>>
	implements ICaseReverseIterator<Source, ArrayIterator<Source>, ArrayReverseIterator<Source>>,
		std.IRandomAccessIterator<Array<number>, ArrayReverseIterator<Source>>
{
	private base_: ArrayIterator<Source>;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(base: ArrayIterator<Source>)
	{
		this.base_ = base.prev();
	}

	public base(): ArrayIterator<Source>
	{
		return this.base_.next();
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public source(): Source
	{
		return this.base_.source();
	}

	public index(): number
	{
		return this.base_.index();
	}

	public get value(): Array<number>
	{
		return this.base_.value;
	}

	public equals(obj: ArrayReverseIterator<Source>): boolean
	{
		return this.base_.equals(obj.base_);
	}

	/* ---------------------------------------------------------
		MOVERS
	--------------------------------------------------------- */
	public prev(): ArrayReverseIterator<Source>
	{
		return this.base().next().reverse();
	}

	public next(): ArrayReverseIterator<Source>
	{
		return this.base().prev().reverse();
	}

	public advance(n: number): ArrayReverseIterator<Source>
	{
		return new ArrayReverseIterator(this.base().advance(-n));
	}
}