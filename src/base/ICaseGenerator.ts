import { ICaseIterator } from "./ICaseIterator";
import { ICaseReverseIterator } from "./ICaseReverseIterator";

export interface ICaseGenerator<
        SourceT extends ICaseGenerator<SourceT, IteratorT>,
        IteratorT extends ICaseIterator<SourceT, IteratorT>>
    extends Iterable<Array<number>>
{
    size(): number;

    begin(): IteratorT;
    end(): IteratorT;

    [Symbol.iterator](): IterableIterator<number[]>;
}
export namespace ICaseGenerator
{
    export interface IBidirectional<
            SourceT extends IBidirectional<SourceT, IteratorT, ReverseT>,
            IteratorT extends ICaseIterator.IResersable<SourceT, IteratorT, ReverseT>,
            ReverseT extends ICaseReverseIterator<SourceT, IteratorT, ReverseT>>
        extends ICaseGenerator<SourceT, IteratorT>
    {
        rbegin(): ReverseT;
        rend(): ReverseT;
    }
}