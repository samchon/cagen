import std = require("tstl");

import { ICaseGenerator } from "../base/ICaseGenerator";
import { ICaseReverseIterator } from "../base/ICaseReverseIterator";
import { ICaseIterator } from "../base/ICaseIterator";

import { CartesianProduct } from "../generators/CartesianProduct";
import { Permutation } from "../generators/Permutation";
import { RepeatedPermutation } from "../generators/RepeatedPermutation";
import { Combination } from "../generators/Combination";

type Elements = Array<number>;

function predicator(x: Elements, y: Elements): boolean
{
	return std.equal(std.begin(x), std.end(x), std.begin(y));
}
function comparator(x: Elements, y: Elements): boolean
{
	for (let i: number = 0; i < x.length; ++i)
		if (x[i] !== y[i])
			return x < y;
	return false;
}

function validate<
		Source extends ICaseGenerator<Source, IteratorT, ReverseT>,
		IteratorT extends ICaseIterator<Source, IteratorT, ReverseT>,
		ReverseT extends ICaseReverseIterator<Source, IteratorT, ReverseT>>
	(name: string, generator: Source): void
{
	//----
	// CONSTRUCT DATA
	//----
	let data: std.Vector<std.TreeSet<Elements>> = new std.Vector();
	for (let i: number = 0; i < 3; ++i)
		data.push_back(new std.TreeSet(comparator));

	for (let it = generator.begin(); !it.equals(generator.end()); it = it.next())
		data.at(0).insert(it.value);
	for (let it = generator.rbegin(); !it.equals(generator.rend()); it = it.next())
		data.at(1).insert(it.value);
	for (let elems of generator)
		data.at(2).insert(elems);

	//----
	// PRINT ELEMENTS
	//----
	console.log("-----------------------------------------------");
	console.log("\t" + name)
	console.log("-----------------------------------------------");

	for (let elems of data.front())
		console.log(elems);

	console.log("-----------------------------------------------");

	//----
	// PREDICATE
	//----
	for (let i: number = 0; i < data.size(); ++i)
	{
		// SIZE
		if (generator.size() !== data.at(i).size())
			throw new std.DomainError(`Difference size on ${i}.`);
		else if (i === 0)
			continue;

		// EQUAL
		if (std.equal(data.front().begin(), data.front().end(), data.at(i).begin(), predicator) === false)
			throw new std.DomainError(`Different data on 0 and ${i}`);
	}
}

function main(): void
{
	validate("Cartesian Product", new CartesianProduct(1, 3, 2, 4));
	validate("Permutation", new Permutation(5, 3));
	validate("Repeated Permutation", new RepeatedPermutation(3, 3));
	validate("Combination", new Combination(6, 3));
}
main();

