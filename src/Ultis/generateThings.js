import { addUrl, buildThing, createThing } from "@inrupt/solid-client";
import { fhir } from "rdf-namespaces";
//generate vocabulary url
const hl7 = (key) => {
  return `http://hl7.org/fhir/${key}`;
};

const generateFunc = (thingName, object, vocabulary) => {
  let newThing = createThing({ name: thingName });

  //an array => array of same type objects => name = key + index
  if (Array.isArray(object)) {
    // eslint-disable-next-line array-callback-return
    object.map((element, index) => {
      newThing = addUrl(
        newThing,
        hl7(vocabulary),
        generateFunc(`${thingName}[${index}]`, element, vocabulary)
      );
    });
  }

  //an object
  else {
    for (var key in object) {
      let newName = thingName + "." + key.toString().toLowerCase();

      //nested object => recursion
      if (typeof object[key] === "object") {
        newThing = addUrl(
          newThing,
          hl7(key),
          generateFunc(newName, object[key], key)
        );
      } else if (typeof object[key] === "string") {
        //build thing
        const thing = buildThing({ name: newName })
          .addStringNoLocale(fhir.v, object[key])
          .build();
        //add to parent thing
        newThing = addUrl(newThing, hl7(key), thing);

        //add to store
        if (!myMap.has(newName)) {
          things.push(thing);
          myMap.set(newName, "add");
        }
      } else if (typeof object[key] === "number") {
        const thing = buildThing({ name: newName })
          .addDecimal(fhir.v, object[key])
          .build();

        newThing = addUrl(newThing, hl7(key), thing);

        if (!myMap.has(newName)) {
          things.push(thing);
          myMap.set(newName, "add");
        }
      } else if (typeof object[key] === "boolean") {
        const thing = buildThing({ name: newName })
          .addBoolean(fhir.v, object[key])
          .build();

        newThing = addUrl(newThing, hl7(key), thing);

        if (!myMap.has(newName)) {
          things.push(thing);
          myMap.set(newName, "add");
        }
      } else {
        const thing = buildThing({ name: newName })
          .addDatetime(fhir.v, object[key])
          .build();

        newThing = addUrl(newThing, hl7(key), thing);

        if (!myMap.has(newName)) {
          things.push(thing);
          myMap.set(newName, "add");
        }
      }
    }
  }
  if (!myMap.has(thingName)) {
    things.push(newThing);
    myMap.set(thingName, "add");
  }

  return newThing;
};
//store all created things
let things = [];
//check if thing added
let myMap = new Map();
export const generateThings = (thingName, object, vocabulary) => {
  things = []
  myMap.clear()
  //thingName: name of generated thing
  //object: object to create things
  //vocabulary: vocabulary url of atrribute/predicate
  generateFunc(thingName, object, vocabulary);
  return things;
};
