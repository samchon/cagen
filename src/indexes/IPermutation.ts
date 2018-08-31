import { ArrayGenerator } from "./ArrayGenerator";

export interface IPermutation<Source extends IPermutation<Source>>
	extends ArrayGenerator<Source>
{
	n(): number;
	r(): number;
}