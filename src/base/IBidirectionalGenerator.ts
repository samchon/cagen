//================================================================ 
/** @module cagen.base */
//================================================================
import { IForwardGenerator } from "./IForwardGenerator";
import { IReversableIterator } from "tstl/iterator/IReversableIterator";
import { IReverseIterator } from "tstl/iterator/IReverseIterator";

/**
 * Bidirection iterable generator.
 * 
 * @typeParam SourceT Derived type extending this {@link IBidirectionalGenerator}
 * @typeParam IteratorT Iterator type
 * @typeParam ReverseT Reverse iterator type
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IBidirectionalGenerator<
        SourceT extends IBidirectionalGenerator<SourceT, IteratorT, ReverseT>, 
        IteratorT extends IBidirectionalGenerator.Iterator<SourceT, IteratorT, ReverseT>,
        ReverseT extends IBidirectionalGenerator.ReverseIterator<SourceT, IteratorT, ReverseT>>
    extends IForwardGenerator<SourceT, IteratorT>
{
    /**
     * Reverse iterator to the first case.
     */
    rbegin(): ReverseT;

    /**
     * Reverse iterator to the end.
     */
    rend(): ReverseT;
}

export namespace IBidirectionalGenerator
{
    /**
     * Iterator of {@link IBidirectionalGenerator}.
     */
    export interface Iterator<
            SourceT extends IBidirectionalGenerator<SourceT, IteratorT, ReverseT>, 
            IteratorT extends Iterator<SourceT, IteratorT, ReverseT>,
            ReverseT extends ReverseIterator<SourceT, IteratorT, ReverseT>>
        extends IReversableIterator<number[], IteratorT, ReverseT>,
            IForwardGenerator.Iterator<SourceT, IteratorT>
    {
    }

    /**
     * Reverse iterator of {@link IBidirectionalGenerator}.
     */
    export interface ReverseIterator<
            SourceT extends IBidirectionalGenerator<SourceT, IteratorT, ReverseT>,
            IteratorT extends Iterator<SourceT, IteratorT, ReverseT>,
            ReverseT extends ReverseIterator<SourceT, IteratorT, ReverseT>>
        extends IReverseIterator<number[], IteratorT, ReverseT>
    {
        /**
         * Get source generator.
         * 
         * @return The source generator.
         */
        source(): SourceT;
    }
}