# Cagen
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/samchon/cagen/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/cagen.svg)](https://www.npmjs.com/package/cagen)
[![Downloads](https://img.shields.io/npm/dm/cagen.svg)](https://www.npmjs.com/package/cagen)
[![Build Status](https://github.com/samchon/cagen/workflows/build/badge.svg)](https://github.com/samchon/cagen/actions?query=workflow%3Abuild)

Number of Case Generator for TypeScript.

Symbol                    | Class
--------------------------|----------------------
A x B x ... x Z           | CartesianProduct
n!                        | Factorial
<sub>n</sub>P<sub>r</sub> | Permutation
<sub>n</sub>∏<sub>r</sub> | RepeatedPermutation
<sub>n</sub>H<sub>r</sub> | RepeatedCombination
<sub>n</sub>C<sub>r</sub> | Combination

  - [API Documents](http://samchon.github.io/cagen/api)
  - [Guide Documents](https://github.com/samchon/cagen/wiki)


## Usage
### Installation
```bash
npm install --save cagen
```

### Common Features
```typescript
namespace cagen.base
{
    export interface IForwardGenerator
    {
        // FREQUENCE ACCESSORS
        size(): number;
        begin(): Iterator;
        end(): Iterator;

        // ES2015, THEN FOR-OF ITERATION IS ALSO POSSIBLE
        [Symbol.iterator]: IterableIterator<number[]>;
    }

    export interface Iterator
    {
        readonly value: number[];

        next(): Iterator;
        equals(obj: Iterator): boolean;
    }
}
```

```typescript
import { CartesianProduct } from "cagen";

function main(): void
{
    let generator = new CartesianProduct(5, 4); // 5C4
    console.log("n(5C4) =", generator.size());

    for (let it = generator.begin(); !it.equals(generator.end()); it = it.next())
    {
        let aCase: number[] = it.value;
        console.log("  -", aCase);
    }
}
main();
```

```typescript
for (let aCase of generator)
    console.log("  -", aCase);
```

### Random Accessor
```typescript
namespace cagen.base
{
    export abstract class ArrayGenerator
        implements IForwardGenerator<Iterator>
    {
        at(index: number): Array<number>;
    }
}
```

Most of Case Generator classes, except combination classes, provide a random accessor `at()`. By that method `at()`, you can access to a specific case through not full iteration, but the special index number.

  - Permutation
  - Factorial
  - RepeatedPermutation
  - CartesianProduct
  - ~~Combination~~
  - ~~RepeatedCombination~~

```typescript
import { Permutation } from "cagen";

function main(): void
{
    let generator = new Permutation(7, 3);

    console.log( generator.at(13) );
    console.log( generator.at(31) );
    console.log( generator.at(9999) ); // throw an std.OutOfRange error.
}
main();
```
