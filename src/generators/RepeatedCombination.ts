import { ICaseGenerator } from "../base/ICaseGenerator";
import { ICaseIterator } from "../base/ICaseIterator";
import { INR } from "../base/INR";

import { OutOfRange } from "tstl/exception/OutOfRange";

/**
 * Repeated-combination generator.
 * 
 * <sub>n</sub>H<sub>r</sub>
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class RepeatedCombination 
    implements ICaseGenerator<RepeatedCombination, RepeatedCombination.Iterator>,
        INR
{
    private n_: number;
    private r_: number;
    private size_: number;

    private begin_: RepeatedCombination.Iterator;
    private end_: RepeatedCombination.Iterator;

    /* ---------------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * @param n Size of candidates.
     * @param r Size of elements of each case.
     */
    public constructor(n: number, r: number)
    {
        INR.validate.bind(this)(n, r);

        this.n_ = n;
        this.r_ = r;
        this.size_ = RepeatedCombination.size(n, r);
        
        this.begin_ = new RepeatedCombination.Iterator(this, 0);
        this.end_ = new RepeatedCombination.Iterator(this, this.size_);
    }

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public size(): number
    {
        return this.size_;
    }
    
    /**
     * @inheritDoc
     */
    public n(): number
    {
        return this.n_;
    }
    
    /**
     * @inheritDoc
     */
    public r(): number
    {
        return this.r_;
    }

    /**
     * @inheritDoc
     */
    public equals(obj: RepeatedCombination): boolean
    {
        return INR.equal_to(this, obj);
    }
    
    /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public begin(): RepeatedCombination.Iterator
    {
        return this.begin_;
    }

    /**
     * @inheritDoc
     */
    public end(): RepeatedCombination.Iterator
    {
        return this.end_;
    }

    /**
     * @inheritDoc
     */
    public [Symbol.iterator](): IterableIterator<number[]>
    {
        return new RepeatedCombination.ForOfAdaptor(this);
    }
}

export namespace RepeatedCombination
{
    export function size(n: number, r: number): number
    {
        let ret: number = 1;
        for (let i: number = 0; i < r; ++i)
            ret *= ((n+r-1) - i) / (i+1);

        return Math.round(ret);
    }
    
    export class Iterator 
        implements ICaseIterator<RepeatedCombination, Iterator>
    {
        private source_: RepeatedCombination;
        private step_: number;
        private indexes_?: number[];
        private value_?: number[];

        public constructor(source: RepeatedCombination, step: number, indexes?: number[])
        {
            this.source_ = source;
            this.step_ = step;
            this.indexes_ = (this.step_ === 0)
                ? _Initialize_indexes(source.r())
                : indexes;
                
            if (this.indexes_ !== undefined)
                this.value_ = _Get_value(this.indexes_);
        }

        public get value(): number[]
        {
            if (this.value_ === undefined)
                throw new OutOfRange("Error on RepeatedCombination.Iterator.value: cannot access to RepeatedCombination.end().value");
            
            return this.value_!;
        }

        public source(): RepeatedCombination
        {
            return this.source_;
        }

        public next(): Iterator
        {
            if (this.indexes_ === undefined) // end
                return this.source_.begin();
            else if (this.step_ === this.source_.size() - 1) // before_end
                return this.source_.end();

            let n: number = this.source_.n();
            let r: number = this.source_.r();
            let indexes: number[] = this.indexes_.slice();

            _Step_to_next(n, r, indexes);
            return new Iterator(this.source_, this.step_ + 1, indexes);
        }

        public equals(obj: Iterator): boolean
        {
            return this.source_.equals(obj.source_) 
                && this.step_ === obj.step_;
        }
    }

    /**
     * @internal
     */
    export class ForOfAdaptor
    {
        private source_: RepeatedCombination;
        private indexes_: number[];
        private done_: boolean;

        public constructor(source: RepeatedCombination)
        {
            this.source_ = source;
            this.indexes_ = _Initialize_indexes(source.r());
            this.done_ = false;
        }

        public next(): IteratorResult<number[]>
        {
            if (this.done_ === true)
                return { done: true, value: undefined! };

            // STEP TO NEXT
            let n: number = this.source_.n();
            let r: number = this.source_.r();

            // RETURNS
            let ret: number[] = _Get_value(this.indexes_);
            this.done_ = _Step_to_next(n, r, this.indexes_);

            return { 
                done: false, 
                value: ret
            };
        }

        public [Symbol.iterator](): IterableIterator<Array<number>>
        {
            return this;
        }
    }

    /**
     * @hidden
     */
    function _Initialize_indexes(r: number): number[]
    {
        let ret: number[] = [];
        for (let i: number = 0; i <= r; ++i)
            ret[i] = 0;

        return ret;
    }

    /**
     * @hidden
     */
    function _Step_to_next(n: number, r: number, indexes: number[]): boolean
    {
        ++indexes[0];
        for (let i: number = 0; i < r; ++i)
            if (indexes[i] > n - 1)
            {
                ++indexes[i + 1];
                for (let k: number = 0; k <= i; ++k)
                    indexes[k] = indexes[i + 1];
            }
        return indexes[r] > 0;
    }

    /**
     * @hidden
     */
    function _Get_value(indexes: number[]): number[]
    {
        return indexes.slice(0, indexes.length - 1).reverse();
    }
}