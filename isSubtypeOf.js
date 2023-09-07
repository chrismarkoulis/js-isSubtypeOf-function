"use strict";

/*
Reflect API.
Δοκιμή για type inference,
απλή υλοποίηση του structural/duck typing που κάνει η TypeScript με το Reflect API.

Introduce μια συνάρτηση (isSubtypeOf), η οποία
παίρνει 2 ορίσματα (δύο οποιαδήποτε JS objects) και -χρησιμοποιώντας το
Reflect API- σου λέει αν το 1ο είναι subtype του 2ου (με τον structural
typing κανόνα που το κάνει κι η TS).
*/

const isSubtypeOf = (subtypeObj, superObj) => {
    let isSubset = false;
    let msg = `${JSON.stringify(subtypeObj)} is not a subtype of ${JSON.stringify(superObj)}`;
    let areValuesOfSameType = false;
    let areKeysPresent = false;

    // PROCEED ONLY IF OBJECTS PROVIDED ARE VALID
    if (
        (typeof superObj === 'object' && superObj != null) &&
        (typeof subtypeObj === 'object' && subtypeObj != null)
    ) {
        //-- Get keys of both objects with reflection api
        const subtypeKeys = Reflect.ownKeys(subtypeObj);
        const superObjKeys = Reflect.ownKeys(superObj);

        // Iterate super object for values with reflect
        //-- Get common keys between objects
        let commonKeys = [];
        for (let key in superObj) {
            if (Reflect.has(superObj, key) && Reflect.ownKeys(subtypeObj).includes(key)) {
                commonKeys.push(key);
            }
        }

        //-- Checks if every key in subtype object exists in supertype as well
        areKeysPresent = subtypeKeys.every(k => superObjKeys.includes(k) || Reflect.has(superObj, k));

        //-- Checks if every value of the common keys between subtype and supertype are of same type
        //-- **** using Reflect API to retrieve the values of keys
        areValuesOfSameType = commonKeys.every(k => typeof Reflect.get(superObj, k) === typeof Reflect.get(subtypeObj, k));


        //-- If keys of subtype is present in supertype AND their values are of same type
        if (areKeysPresent && areValuesOfSameType) {
            isSubset = true;
            msg = `${JSON.stringify(subtypeObj)} is a subtype of ${JSON.stringify(superObj)}`;
        }

    } else {
        isSubset = undefined;
        msg = "not valid objects provided";
    }

    return {
        isSubset,
        msg
    };
}


//----------------------------- DUMMY DATA -----------------------------//

const user = {
    userId: "2b3ku1j2b31kj221cgk312rtxgho1m",
    name: "chris",
    email: "cm@cm.com",
    place: {
        city: "Athens",
        country: "Greece"
    },
    age: 30
};

const testUser = {
    userId: "56789",
    name: "Joe",
    age: "30",
};

//----------------------------- ----- ---- -----------------------------//




//-- USAGE

const { isSubset, msg } = isSubtypeOf(testUser, user); // false, because 'age' value at testUser is a string and in user is a number
console.log("IS SUBSET: ", isSubset);
console.log("MSG: ", msg);