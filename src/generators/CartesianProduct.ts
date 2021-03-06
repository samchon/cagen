//================================================================ 
/** @module cagen */
//================================================================
import { ArrayGenerator } from "../base/ArrayGenerator";

import { InvalidArgument } from "tstl/exception/InvalidArgument";
import { equal } from "tstl/ranges/algorithm/iterations";

/**
 * Cartesian-product generator.
 * 
 * A<sub>1</sub> X A<sub>2</sub> X ... X A<sub>n</sub>
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class CartesianProduct extends ArrayGenerator<CartesianProduct>
{
    private digits_: Array<number>;
    private size_: number;
    
    private dividers_: Array<number>;

    /* -----------------------------------------------------------
        CONSTRUCTORS
    ----------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * @param digits Maximum numbers of each digit.
     */
    public constructor(...digits: number[])
    {
        super();
        this.digits_ = digits;
        this.dividers_ = new Array(digits.length);

        this.size_ = 1;
        for (let i: number = digits.length - 1; i >= 0; i--)
        {
            let value: number = digits[i];
            if (value <= 0 || Math.floor(value) !== value)
                throw new InvalidArgument(`Error on ${this.constructor.name}.constructor(): parametric values must be positive integer -> (${digits.join(", ")})`);

            this.dividers_[i] = this.size_;
            this.size_ *= value;
        }
    }

    /* -----------------------------------------------------------
        ACCESSORS
    ----------------------------------------------------------- */
    /**
     * @inheritdoc
     */
    public size(): number
    {
        return this.size_;
    }

    /**
     * Get digits, maximum number (size) of each digit.
     */
    public digits(): Array<number>
    {
        return this.digits_;
    }

    /**
     * @inheritdoc
     */
    public equals(obj: CartesianProduct): boolean
    {
        return equal(this.digits_, obj.digits_);
    }

    /* -----------------------------------------------------------
        COMPUTATION
    ----------------------------------------------------------- */
    protected _At(index: number): Array<number>
    {
        let row: Array<number> = [];
        for (let i: number = 0; i < this.digits_.length; i++)
        {
            let val: number = Math.floor(index / this.dividers_[i]);
            val = val % this.digits_[i];

            row.push(val);
        }

        return row;
    }
}

export namespace CartesianProduct
{
    /**
     * Iterator of {@link CartesianProduct}.
     */
    export type Iterator = ArrayGenerator.Iterator<CartesianProduct>;

    /**
     * Reverse iterator of {@link CartesianProduct}.
     */
    export type ReverseIterator = ArrayGenerator.ReverseIterator<CartesianProduct>;

    /**
     * Compute number of cases when {@link CartesianProduct}.
     * 
     * @param digits Maximum numbers of each digit.
     * @return Computed number of cases.
     */
    export function size(...digits: number[]): number
    {
        let ret: number = 1;
        for (let elem of digits)
            ret *= elem;

        return ret;
    }
}