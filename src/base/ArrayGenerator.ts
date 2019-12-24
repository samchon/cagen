import { ICaseGenerator } from "./ICaseGenerator";
import { ICaseIterator } from "./ICaseIterator";
import { ICaseReverseIterator } from "./ICaseReverseIterator";

import { OutOfRange } from "tstl/exception";
import { equal_to } from "tstl/functional/comparators";

export abstract class ArrayGenerator<Source extends ArrayGenerator<Source>>
    implements ICaseGenerator.IBidirectional<Source, ArrayGenerator.Iterator<Source>, ArrayGenerator.ReverseIterator<Source>>
{
    /* ---------------------------------------------------------
        COMPUTATIONS
    --------------------------------------------------------- */
    public abstract size(): number;
    
    public at(index: number): Array<number>
    {
        if (index < 0)
            throw new OutOfRange(`Error on ${this.constructor.name}.at(): parametric index is negative -> (index = ${index})`);
        else if (index >= this.size())
            throw new OutOfRange(`Error on ${this.constructor.name}.at(): parametric index is equal or greater than size -> (index = ${index}, size = ${this.size()})`);

        return this._At(index);
    }

    /**
     * @hidden
     */
    protected abstract _At(index: number): Array<number>;

    /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
    public begin(): ArrayGenerator.Iterator<Source>
    {
        return new ArrayGenerator.Iterator(<any>this, 0);
    }
    public end(): ArrayGenerator.Iterator<Source>
    {
        return new ArrayGenerator.Iterator(<any>this, this.size());
    }

    public rbegin(): ArrayGenerator.ReverseIterator<Source>
    {
        return this.end().reverse();
    }
    public rend(): ArrayGenerator.ReverseIterator<Source>
    {
        return this.begin().reverse();
    }

    public [Symbol.iterator](): IterableIterator<number[]>
    {
        return new ArrayGenerator.ForOfAdaptor(<any>this);
    }
}

export namespace ArrayGenerator
{
    export class Iterator<Source extends ArrayGenerator<Source>>
        implements ICaseIterator.IResersable<Source, Iterator<Source>, ReverseIterator<Source>>
    {
        private source_: Source;
        private index_: number;

        public constructor(source: Source, index: number)
        {
            this.source_ = source;
            this.index_ = index;
        }

        public reverse(): ReverseIterator<Source>
        {
            return new ReverseIterator(this);
        }

        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        public source(): Source
        {
            return this.source_;
        }

        public index(): number
        {
            return this.index_;
        }

        public get value(): Array<number>
        {
            return this.source_.at(this.index_);
        }

        public equals(obj: Iterator<Source>): boolean
        {
            return this.index_ === obj.index_ 
                && equal_to(this.source_, obj.source_);
        }

        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        public prev(): Iterator<Source>
        {
            return new Iterator(this.source_, this.index_ - 1);
        }

        public next(): Iterator<Source>
        {
            return new Iterator(this.source_, this.index_ + 1);
        }

        public advance(n: number): Iterator<Source>
        {
            return new Iterator(this.source_, this.index_ + n);
        }
    }

    export class ReverseIterator<Source extends ArrayGenerator<Source>>
        implements ICaseReverseIterator<Source, Iterator<Source>, ReverseIterator<Source>>
    {
        private base_: Iterator<Source>;

        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        public constructor(base: Iterator<Source>)
        {
            this.base_ = base.prev();
        }

        public base(): Iterator<Source>
        {
            return this.base_.next();
        }

        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        public source(): Source
        {
            return this.base_.source();
        }

        public index(): number
        {
            return this.base_.index();
        }

        public get value(): Array<number>
        {
            return this.base_.value;
        }

        public equals(obj: ReverseIterator<Source>): boolean
        {
            return this.base_.equals(obj.base_);
        }

        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        public prev(): ReverseIterator<Source>
        {
            return this.base().next().reverse();
        }

        public next(): ReverseIterator<Source>
        {
            return this.base().prev().reverse();
        }

        public advance(n: number): ReverseIterator<Source>
        {
            return new ReverseIterator(this.base().advance(-n));
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