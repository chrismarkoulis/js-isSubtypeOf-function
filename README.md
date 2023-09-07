# JS Object Type Inference using Reflect APΙ

> Test for type inference in JS

> Simple implementation of structural typing using Reflect API


## Implementation

The concept is that we have a function (isSubtypeOf) that takes 2 objects as arguments, a subtype object (1st argument) and a supertype object (2nd argument). In order to be a subtype object it must have keys that are present at the supertype and the values of that keys must be of the same type.

##### 
    const isSubtypeOf = (subtypeObj, superObj) => {
        let isSubset = false;

        //
        return isSubset;
    }

Then the function must return either true if the 1st object is indeed a subtype to the 2nd object (supertype), or false if it's not.

To achieve that, we must first check if the objects provided are valid:

#####  
    if (
        (typeof superObj === 'object' && superObj != null) &&
        (typeof subtypeObj === 'object' && subtypeObj != null)
       )


## First step is to get the common keys between the subtype and the supertype object
Then, we must iterate through the supertype object and with the help of Reflect api, get the common keys.

        let commonKeys = [];
        for (let key in superObj) {
            if (Reflect.has(superObj, key) && Reflect.ownKeys(subtypeObj).includes(key)) {
                commonKeys.push(key);
            }
        }

## Check value types
Before we compare the value types of the 2 objects, we need to check that every key in subtype is present in the supertype as well.

        areKeysPresent = subtypeKeys.every(k => superObjKeys.includes(k) || Reflect.has(superObj, k));


Now we can compare the types of values using Reflect.

        areValuesOfSameType = commonKeys.every(k => typeof Reflect.get(superObj, k) === typeof Reflect.get(subtypeObj, k));


So, only if  `areKeysPresent` and `areValuesOfSameType` are true, then the 1st object is indeed a subtype.

        if (areKeysPresent && areValuesOfSameType) {
            isSubset = true;
        }


### Full code in JS file [here](./isSubtypeOf.js)