import { OutOfRange, InvalidArgument } from "tstl/exception";

export class RepeatedCombination
{
    private n_: number;
    private r_: number;
    private size_: number;

    private begin_: RepeatedCombination.Iterator;
    private end_: RepeatedCombination.Iterator;

    public constructor(n: number, r: number)
    {
        if (n <= 0 || r <= 0 || Math.abs(n) !== n || Math.abs(r) !== r)
            throw new InvalidArgument(`Error on RepeatedCombination.constructor(): both n and r must be positive integer -> (n = ${n}, r = ${r})`);

        this.n_ = n;
        this.r_ = r;
        this.size_ = RepeatedCombination.size(n, r);
        
        this.begin_ = new RepeatedCombination.Iterator(this, 0);
        this.end_ = new RepeatedCombination.Iterator(this, this.size_);
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

    public equals(obj: RepeatedCombination): boolean
    {
        return this.n_ === obj.n_ && this.r_ === obj.r_;
    }
    
    /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
    public begin(): RepeatedCombination.Iterator
    {
        return this.begin_;
    }

    public end(): RepeatedCombination.Iterator
    {
        return this.end_;
    }

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