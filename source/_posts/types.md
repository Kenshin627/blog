---
title: Haskell02-types
date: 2021-11-18 16:30:41
tags:
- haskell 
- functional programming
categories:
- Haskell
---

# 01. TYPE BASICS
in Haskell, you haven’t had to write down any information about the
type you’re using for any of your values. It turns out this is because Haskell has done it
for you! Haskell uses type inference to automatically determine the types of all values at
compile time based on the way they’re used! You don’t have to rely on Haskell to determine your types for you.

![alt](types/1.png)

## list  tuple  function 
![alt](types/2.png)

### Functions with multiple arguments
why are type signatures this way? The reason is that behind the scenes in Haskell, all functions take only one argument. By rewriting makeAddress by using a series of nested lambda functions.

![alt](types/3.png)

### Types for first-class functions
functions can take functions as arguments and return
functions as values. To write these type signatures, you write the individual function
values in parentheses.

![alt](types/4.png)

## Type variables
 Haskell has type variables. Any lowercase letter in a type signature indicates that any type can be used in that place.
 Type variables are literally variables for types. Type variables work exactly like regular
variables, but instead of representing a value, they represent a type. When you use a
function that has a type variable in its signature, you can imagine Haskell substituting
the variable that’s needed.

# 02. CREATING YOUR OWN TYPES
## type synonyms
When you have two names for the same type, it’s referred to as a type synonym. Type synonyms are extremely useful, because they make reading type signatures much easier. 
_**In Haskell, you can create new type synonyms by using the type keyword.**_

## Creating new types

## record syntax
You can define data types such as Patient by using record syntax. Defining a new data type by using record syntax makes it much easier to understand which types represent
which properties of the data type.
![alt](types/5.png)

### automatically getters and setters
you don’t have to write your getters; each field in the record syntax automatically creates a function to access that value from the record.You can also set values in record syntax by passing the new value in curly brackets to
your data.
![alt](types/6.png)

# 03. TYPE CLASSES
Type classes in Haskell are a way of describing groups of types that all behave in the same way. If you’re familiar with
Java or C#, type classes may remind you of interfaces.

## definition
definition of the type class is a list of functions that all members of the class must implement, along with the type signatures of
those functions. The family of functions that describe a number is +, -, *, negate, abs, and
signum (gives the sign of a number)
![alt](types/7.jpg)

## The benefits of type classes
So far in Haskell, each function you’ve defined works for only one specific set of types. Without type classes, you’d need a different name for each function that adds a different type of value. You do have type variables, but they’re too flexible.
_**Type classes also allow you to define functions on a variety of types that you can’t even
think of**_

## Defining a type class
![alt](types/8.jpg)

## Deriving type classes
![alt](types/9.png)

## implement type class 
![alt](types/10.png)

## Creating types with newtype
When looking at our type definition for Name, you find an interesting case in which you’d like to use a type synonym, but need to define a data type in order to make your type an instance of a type class. Haskell has a preferred method of doing this: _**using the newtype keyword.**_ Here’s an example of the definition of Name using newtype.
![alt](types/11.png)

# 04. AlGEBRAIC DATA TYPES
Algebraic data types are any types that can be made by combining other types. The key to understanding algebraic data types is knowing exactly how to combine other types. Thankfully, there are only two ways. You can combine multiple types with an and (for example, a name is a String and another String), or you can combine types with an or (for example, a Bool is a True data constructor or a False data constructor). Types that are made by combining other types with an and are called product types. Types combined using or are called sum types.

## product type
Product types are created by combining two or more existing types with and, bundling two or more types together to define a new type. Nearly every programming language supports product types, even if not by that name.
![alt](types/12.png)

## sum type
Sum types are a surprisingly powerful tool, given that they provide only the capability to combine two types with or. 

# 05. DESIGN BY COMPOSITION—SEMIGROUPS AND MONOIDS

## combining functions
combining functions:A special higher-order function that’s just a period (called compose) takes two functions as arguments.