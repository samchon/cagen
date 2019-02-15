import { Vector } from "tstl/container/Vector";

export type BitMask = Vector<boolean>;

export function convert(bitMask: BitMask): Array<number>
{
	let ret: Array<number> = [];

	for (let i: number = 0; i < bitMask.size(); ++i)
		if (bitMask.at(i))
			ret.push(i);

	return ret;
}