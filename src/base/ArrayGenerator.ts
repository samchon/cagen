//================================================================ 
/** @module cagen.base */
//================================================================
import { IBidirectionalGenerator } from "./IBidirectionalGenerator";

import { IRandomAccessIterator } from "tstl/iterator/IRandomAccessIterator";
import { OutOfRange } from "tstl/exception/OutOfRange";

/**
 * Basic array generator.
 * 
 * @typeParam SourceT Derived type extending this {@link ArrayGenerator}
 * @author Jeongho Nam - https://github.com/samchon
 */
export abstract class ArrayGenerator<SourceT extends ArrayGenerator<SourceT>>
    implements IBidirectionalGenerator<SourceT, ArrayGenerator.Iterator<SourceT>, ArrayGenerator.ReverseIterator<SourceT>>
{
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public abstract size(): number;
    
    /**
     * Get a case at specific position.
     * 
     * @param index Specific position.
     * @return The case at the *index*.
     */
    public at(index: number): Array<number>
    {
        if (index < 0)
            throw new OutOfRange(`Error on ${this.constructor.name}.at(): parametric index is negative -> (index = ${index})`);
        else if (index >= this.size())
            throw new OutOfRange(`Error on ${this.constructor.name}.at(): parametric index is equal or greater than size -> (index = ${index}, size = ${this.size()})`);

        return this._At(index);
    }

    /**
     * Get iterator at specific position.
     * 
     * @param index Specific position.
     * @return The iterator at the *index*.
     */
    public nth(index: number): ArrayGenerator.Iterator<SourceT>
    {
        return new ArrayGenerator.Iterator(this as any, index);
    }

    /**
     * @inheritDoc
     */
    public abstract equals(obj: SourceT): boolean;

    /**
     * @hidden
     */
    protected abstract _At(index: number): Array<number>;

    /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public begin(): ArrayGenerator.Iterator<SourceT>
    {
        return this.nth(0);
    }

    /**
     * @inheritDoc
     */
    public end(): ArrayGenerator.Iterator<SourceT>
    {
        return this.nth(this.size());
    }

    /**
     * @inheritDoc
     */
    public rbegin(): ArrayGenerator.ReverseIterator<SourceT>
    {
        return this.end().reverse();
    }

    /**
     * @inheritDoc
     */
    public rend(): ArrayGenerator.ReverseIterator<SourceT>
    {
        return this.begin().reverse();
    }

    /**
     * @inheritDoc
     */
    public [Symbol.iterator](): IterableIterator<number[]>
    {
        return new ArrayGenerator.ForOfAdaptor(<any>this);
    }
}

export namespace ArrayGenerator
{
    /**
     * Iterator of {@link ArrayGenerator}.
     * 
     * @author Jeongho Nam - https://github.com/samchon
     */
    export class Iterator<SourceT extends ArrayGenerator<SourceT>>
        implements IBidirectionalGenerator.Iterator<SourceT, Iterator<SourceT>, ReverseIterator<SourceT>>,
            IRandomAccessIterator<number[], Iterator<SourceT>>
    {
        private source_: SourceT;
        private index_: number;

        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Initializer Constructor.
         * 
         * @param source Source generator.
         * @param index Index number.
         */
        public constructor(source: SourceT, index: number)
        {
            this.source_ = source;
            this.index_ = index;
        }

        /**
         * @inheritDoc
         */
        public reverse(): ReverseIterator<SourceT>
        {
            return new ReverseIterator(this);
        }

        /**
         * @inheritDoc
         */
        public prev(): Iterator<SourceT>
        {
            return new Iterator(this.source_, this.index_ - 1);
        }

        /**
         * @inheritDoc
         */
        public next(): Iterator<SourceT>
        {
            return new Iterator(this.source_, this.index_ + 1);
        }

        /**
         * @inheritDoc
         */
        public advance(n: number): Iterator<SourceT>
        {
            return new Iterator(this.source_, this.index_ + n);
        }

        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        public source(): SourceT
        {
            return this.source_;
        }

        /**
         * @inheritDoc
         */
        public index(): number
        {
            return this.index_;
        }

        /**
         * @inheritDoc
         */
        public get value(): Array<number>
        {
            return this.source_.at(this.index_);
        }

        /**
         * @inheritDoc
         */
        public equals(obj: Iterator<SourceT>): boolean
        {
            return this.index_ === obj.index_ 
                && this.source_.equals(obj.source_);
        }
    }

    /**
     * Reverse iterator of {@link ArrayGenerator}.
     * 
     * @author Jeongho Nam - https://github.com/samchon
     */
    export class ReverseIterator<SourceT extends ArrayGenerator<SourceT>>
        implements IBidirectionalGenerator.ReverseIterator<SourceT, Iterator<SourceT>, ReverseIterator<SourceT>>,
            IRandomAccessIterator<number[], ReverseIterator<SourceT>>
    {
        private base_: Iterator<SourceT>;

        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Initializer Constructor.
         * 
         * @param base The base iterator.
         */
        public constructor(base: Iterator<SourceT>)
        {
            this.base_ = base.prev();
        }

        /**
         * @inheritDoc
         */
        public prev(): ReverseIterator<SourceT>
        {
            return this.base().next().reverse();
        }

        /**
         * @inheritDoc
         */
        public next(): ReverseIterator<SourceT>
        {
            return this.base().prev().reverse();
        }

        /**
         * @inheritDoc
         */
        public advance(n: number): ReverseIterator<SourceT>
        {
            return new ReverseIterator(this.base().advance(-n));
        }

        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        public base(): Iterator<SourceT>
        {
            return this.base_.next();
        }

        /**
         * @inheritDoc
         */
        public source(): SourceT
        {
            return this.base_.source();
        }

        /**
         * @inheritDoc
         */
        public index(): number
        {
            return this.base_.index();
        }

        /**
         * @inheritDoc
         */
        public get value(): Array<number>
        {
            return this.base_.value;
        }

        /**
         * @inheritDoc
         */
        public equals(obj: ReverseIterator<SourceT>): boolean
        {
            return this.base_.equals(obj.base_);
        }
    }

    /**
     * @internal
     */
    export class ForOfAdaptor<Source extends ArrayGenerator<Source>>
        implements IterableIterator<number[]>
    {
        private source_: Source;
        private index_: number;

        public constructor(source: Source)
        {
            this.source_ = source;
            this.index_ = 0;
        }

        public next(): IteratorResult<Array<number>>
        {
            if (this.index_ === this.source_.size())
                return {
                    done: true,
                    value: undefined!
                };
            else
                return {
                    done: false,
                    value: this.source_.at(this.index_++)
                };
        }

        public [Symbol.iterator](): IterableIterator<Array<number>>
        {
            return this;
        }
    }
}