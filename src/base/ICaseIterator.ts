import { IReversableIterator } from "tstl/iterator";

import { ICaseGenerator } from "./ICaseGenerator";
import { ICaseReverseIterator } from "./ICaseReverseIterator";

export interface ICaseIterator<
		SourceT extends ICaseGenerator<SourceT, IteratorT, ReverseT>,
		IteratorT extends ICaseIterator<SourceT, IteratorT, ReverseT>,
		ReverseT extends ICaseReverseIterator<SourceT, IteratorT, ReverseT>>
	extends IReversableIterator<Array<number>, IteratorT, ReverseT>
{
	source(): SourceT;
}