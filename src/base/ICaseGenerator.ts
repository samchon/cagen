import { ICaseIterator } from "./ICaseIterator";

export interface ICaseGenerator<
		SourceT extends ICaseGenerator<SourceT, IteratorT>,
		IteratorT extends ICaseIterator<SourceT, IteratorT>>
	extends Iterable<Array<number>>
{
	size(): number;

	begin(): IteratorT;
	end(): IteratorT;
}