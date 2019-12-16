import { ICaseGenerator } from "./ICaseGenerator";
import { IForwardIterator } from "tstl/iterator/IForwardIterator";

export interface ICaseIterator<
        SourceT extends ICaseGenerator<SourceT, IteratorT>,
        IteratorT extends ICaseIterator<SourceT, IteratorT>>
    extends IForwardIterator<Array<number>, IteratorT>
{
    source(): SourceT;
}