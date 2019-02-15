import { ArrayGenerator } from "./ArrayGenerator";

export class ArrayForOfAdaptor<Source extends ArrayGenerator<Source>>
	implements IterableIterator<Array<number>>
{
	private source_: Source;
	private index_: number;

	public constructor(source: Source)
	{
		this.source_ = source;
		this.index_ = 0;
	}

	public next(): IteratorResult<Array<number>>
	{
		if (this.index_ === this.source_.size())
			return {
				done: true,
				value: undefined!
			};
		else
			return {
				done: false,
				value: this.source_.at(this.index_++)
			};
	}

	public [Symbol.iterator](): IterableIterator<Array<number>>
	{
		return this;
	}
}