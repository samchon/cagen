import { IForwardIterator } from "tstl/iterator/IForwardIterator";
import { IReversableIterator } from "tstl/iterator/IReversableIterator";

import { ICaseGenerator } from "./ICaseGenerator";
import { ICaseReverseIterator } from "./ICaseReverseIterator";

export interface ICaseIterator<
        SourceT extends ICaseGenerator<SourceT, IteratorT>,
        IteratorT extends ICaseIterator<SourceT, IteratorT>>
    extends IForwardIterator<Array<number>, IteratorT>
{
    source(): SourceT;
}
export namespace ICaseIterator
{
    export interface IResersable<
            SourceT extends ICaseGenerator<SourceT, IteratorT>,
            IteratorT extends IResersable<SourceT, IteratorT, ReverseT>,
            ReverseT extends ICaseReverseIterator<SourceT, IteratorT, ReverseT>>
        extends ICaseIterator<SourceT, IteratorT>,
            IReversableIterator<Array<number>, IteratorT, ReverseT>
    {
    }
}