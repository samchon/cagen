import { ICaseGenerator } from "../base/ICaseGenerator";

import { ArrayIterator } from "./ArrayIterator";
import { ArrayReverseIterator } from "./ArrayReverseIterator";
import { ArrayForOfAdaptor } from "./ArrayForOfAdaptor";

export abstract class ArrayGenerator<Source extends ArrayGenerator<Source>>
	implements ICaseGenerator<Source, ArrayIterator<Source>, ArrayReverseIterator<Source>>
{
	/* ---------------------------------------------------------
		COMPUTATIONS
	--------------------------------------------------------- */
	public abstract size(): number;
	public abstract at(index: number): Array<number>;

	/* ---------------------------------------------------------
		ITERATORS
	--------------------------------------------------------- */
	public begin(): ArrayIterator<Source>
	{
		return new ArrayIterator(<any>this, 0);
	}
	public end(): ArrayIterator<Source>
	{
		return new ArrayIterator(<any>this, this.size());
	}

	public rbegin(): ArrayReverseIterator<Source>
	{
		return this.end().reverse();
	}
	public rend(): ArrayReverseIterator<Source>
	{
		return this.begin().reverse();
	}

	public [Symbol.iterator](): IterableIterator<Array<number>>
	{
		return new ArrayForOfAdaptor(<any>this);
	}
}