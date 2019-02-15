import { BitMask, convert } from "./BitMask";
import { prev_permutation } from "tstl/algorithm/mathematics";

export class CombinationForOfAdaptor
{
	private bit_mask_: BitMask;
	private done_: boolean;

	public constructor(bit_mask_: BitMask)
	{
		this.bit_mask_ = bit_mask_;
		this.done_ = false;
	}

	public next(): IteratorResult<Array<number>>
	{
		if (this.done_ === true)
			return {
				done: true,
				value: undefined!
			};
		else
		{
			let value: Array<number> = convert(this.bit_mask_);
			this.done_ = !prev_permutation(this.bit_mask_.begin(), this.bit_mask_.end());

			return {
				done: false,
				value: value
			};
		}
	}

	public [Symbol.iterator](): IterableIterator<Array<number>>
	{
		return this;
	}
}