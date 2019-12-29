import { ICaseGenerator } from "../base/ICaseGenerator";
import { ICaseIterator } from "../base/ICaseIterator";
import { ICaseReverseIterator } from "../base/ICaseReverseIterator";
import { Validator } from "../base/Validator";

import { Vector } from "tstl/container/Vector";
import { OutOfRange } from "tstl/exception/OutOfRange";
import { prev_permutation, next_permutation } from "tstl/ranges/algorithm/mathematics";

export class Combination 
    implements ICaseGenerator.IBidirectional<Combination, Combination.Iterator, Combination.ReverseIterator>
{
    private n_: number;
    private r_: number;
    private size_: number;

    private bit_mask_: Vector<boolean>;
    private begin_: Combination.Iterator;
    private end_: Combination.Iterator;

    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    public constructor(n: number, r: number)
    {
        Validator.initializer.bind(this)(n, r);

        // BASIC MEMBERS
        this.n_ = n;
        this.r_ = r;
        this.size_ = 1;

        for (let i: number = 0; i < r; ++i)
            this.size_ *= (n-i) / (i+1);

        this.bit_mask_ = new Vector(r, true);
        this.bit_mask_.insert(this.bit_mask_.end(), n - r, false);

        // ITERATORS
        this.begin_ = new Combination.Iterator(this, 0, this.bit_mask_);
        this.end_ = new Combination.Iterator(this, this.size_);
    }

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    public size(): number
    {
        return this.size_;
    }

    public n(): number
    {
        return this.n_;
    }

    public r(): number
    {
        return this.r_;
    }

    public equals(obj: Combination): boolean
    {
        return this.n_ === obj.n_ && this.r_ === obj.r_;
    }

    /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
    public begin(): Combination.Iterator
    {
        return this.begin_;
    }
    public end(): Combination.Iterator
    {
        return this.end_;
    }

    public rbegin(): Combination.ReverseIterator
    {
        return this.end_.reverse();
    }
    public rend(): Combination.ReverseIterator
    {
        return this.begin_.reverse();
    }

    public [Symbol.iterator](): IterableIterator<number[]>
    {
        return new Combination.ForOfAdaptor(this.bit_mask_);
    }
}

export namespace Combination
{
    export class Iterator implements ICaseIterator.IResersable<Combination, Iterator, ReverseIterator>
    {
        private source_: Combination;
        private step_: number;
        private bit_mask_?: Vector<boolean>;
        private value_?: Array<number>;

        public constructor(source: Combination, step: number, bitMask?: Vector<boolean>)
        {
            this.source_ = source;
            this.step_ = step;
            this.bit_mask_ = bitMask;

            if (bitMask !== undefined)
                this.value_ = _Mask(bitMask);
        }

        public reverse(): ReverseIterator
        {
            return new ReverseIterator(this);
        }

        public source(): Combination
        {
            return this.source_;
        }

        public get value(): number[]
        {
            if (this.value_ === undefined)
                throw new OutOfRange("Error on Combination.Iterator.value: cannot access to Combination.end().value");
            return this.value_;
        }

        public equals(obj: Iterator): boolean
        {
            return this.source_.equals(obj.source_) 
                && this.step_ === obj.step_;
        }
        
        public prev(): Combination.Iterator
        {
            if (this.bit_mask_ === undefined)
            {
                let it: Iterator = this.source_.begin();
                let mask: Vector<boolean> = new Vector(it.bit_mask_!);

                next_permutation(mask);
                return new Iterator(this.source_, this.source_.size() - 1, mask);
            }
            else
                return this._Advance(this.step_ - 1, next_permutation);
        }

        public next(): Combination.Iterator
        {
            if (this.bit_mask_ === null)
                return this.source_.begin();
            else
                return this._Advance(this.step_ + 1, prev_permutation);
        }

        private _Advance(step: number, func: typeof next_permutation): Iterator
        {
            if (step < 0 || step === this.source_.size())
                return this.source_.end();
            
            let mask: Vector<boolean> = new Vector(this.bit_mask_!);
            func(mask);

            return  new Iterator(this.source_, step, mask);
        }
    }

    export class ReverseIterator implements ICaseReverseIterator<Combination, Iterator, ReverseIterator>
    {
        private base_: Iterator;

        public constructor(base: Iterator)
        {
            this.base_ = base.prev();
        }

        public base(): Iterator
        {
            return this.base_.next();
        }

        public source(): Combination
        {
            return this.base_.source();
        }

        public get value(): Array<number>
        {
            return this.base_.value;
        }

        public equals(obj: ReverseIterator): boolean
        {
            return this.base_.equals(obj.base_);
        }

        public prev(): ReverseIterator
        {
            return this.base().next().reverse();
        }

        public next(): ReverseIterator
        {
            return this.base().prev().reverse();
        }
    }

    /**
     * @internal
     */
    export class ForOfAdaptor
    {
        private bit_mask_: Vector<boolean>;
        private done_: boolean;

        public constructor(bitMask: Vector<boolean>)
        {
            this.bit_mask_ = bitMask;
            this.done_ = false;
        }

        public next(): IteratorResult<number[]>
        {
            if (this.done_ === true)
                return {
                    done: true,
                    value: undefined!
                };
            else
            {
                let value: Array<number> = _Mask(this.bit_mask_);
                this.done_ = !prev_permutation(this.bit_mask_);

                return {
                    done: false,
                    value: value
                };
            }
        }

        public [Symbol.iterator](): IterableIterator<number[]>
        {
            return this;
        }
    }

    /**
     * @internal
     */
    function _Mask(bitMask: Vector<boolean>): number[]
    {
        let ret: number[] = [];

        for (let i: number = 0; i < bitMask.size(); ++i)
            if (bitMask.at(i))
                ret.push(i);

        return ret;
    }
}