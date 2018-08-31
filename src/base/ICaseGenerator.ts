import { ICaseIterator } from "./ICaseIterator";
import { ICaseReverseIterator } from "./ICaseReverseIterator";

export interface ICaseGenerator<
		SourceT extends ICaseGenerator<SourceT, IteratorT, ReverseT>,
		IteratorT extends ICaseIterator<SourceT, IteratorT, ReverseT>,
		ReverseT extends ICaseReverseIterator<SourceT, IteratorT, ReverseT>>
	extends Iterable<Array<number>>
{
	size(): number;

	begin(): IteratorT;
	end(): IteratorT;
	rbegin(): ReverseT;
	rend(): ReverseT;
}