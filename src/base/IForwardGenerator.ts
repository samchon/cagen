//================================================================ 
/** @module cagen.base */
//================================================================
import { IForwardIterator } from "tstl/iterator/IForwardIterator";
import { IComparable } from "tstl/functional/IComparable";

/**
 * Forward iterable generator.
 * 
 * @typeParam SourceT Derived type extending this {@link IForwardGenerator}
 * @typeParam IteratorT Iterator type
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IForwardGenerator<
        SourceT extends IForwardGenerator<SourceT, IteratorT>,
        IteratorT extends IForwardGenerator.Iterator<SourceT, IteratorT>>
    extends Iterable<number[]>,
        Pick<IComparable<SourceT>, "equals">
{
    /**
     * Number of cases in the generator.
     */
    size(): number;

    /**
     * Iterator to the first case.
     */
    begin(): IteratorT;

    /**
     * Iterator to the end.
     */
    end(): IteratorT;

    /**
     * Calls a defined callback function on each element of cases, 
     * and returns an array that contains the results.
     * 
     * @param callbackfn A function that accepts up to three arguments. 
     *                   The map method calls the callbackfn function one time 
     *                   for each element in the cases.
     */
    map<T>(callbackfn: (row: number[], index: number, source: SourceT) => T): T[];
}

export namespace IForwardGenerator
{
    /**
     * Iterator of {@link IForwardGenerator}.
     */
    export interface Iterator<
            SourceT extends IForwardGenerator<SourceT, IteratorT>,
            IteratorT extends Iterator<SourceT, IteratorT>>
        extends IForwardIterator<number[], IteratorT>
    {
        /**
         * Get source generator.
         * 
         * @return The source generator.
         */
        source(): SourceT;
    }
}