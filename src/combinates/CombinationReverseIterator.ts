import { ICaseReverseIterator } from "../base/ICaseReverseIterator";

import { Combination } from "../generators/Combination";
import { CombinationIterator } from "./CombinationIterator";

export class CombinationReverseIterator
	implements ICaseReverseIterator<Combination, CombinationIterator, CombinationReverseIterator>
{
	private base_: CombinationIterator;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(base: CombinationIterator)
	{
		this.base_ = base.prev();
	}

	public base(): CombinationIterator
	{
		return this.base_.next();
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public source(): Combination
	{
		return this.base_.source();
	}

	public get value(): Array<number>
	{
		return this.base_.value;
	}

	public equals(obj: CombinationReverseIterator): boolean
	{
		return this.base_.equals(obj.base_);
	}

	/* ---------------------------------------------------------
		MOVERS
	--------------------------------------------------------- */
	public prev(): CombinationReverseIterator
	{
		return this.base().next().reverse();
	}

	public next(): CombinationReverseIterator
	{
		return this.base().prev().reverse();
	}
}