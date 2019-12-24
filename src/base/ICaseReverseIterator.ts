import { IReverseIterator } from "tstl/iterator";

import { ICaseGenerator } from "./ICaseGenerator";
import { ICaseIterator } from "./ICaseIterator";

export interface ICaseReverseIterator<
        SourceT extends ICaseGenerator<SourceT, IteratorT>,
        IteratorT extends ICaseIterator.IResersable<SourceT, IteratorT, ReverseT>,
        ReverseT extends ICaseReverseIterator<SourceT, IteratorT, ReverseT>>
    extends IReverseIterator<Array<number>, IteratorT, ReverseT>
{
    source(): SourceT;
}