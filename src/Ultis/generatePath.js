//create path (thing name) to get a property
export const generatePath = (base, object) => {
  //an array => array of same type objects => name = key + index
  if (Array.isArray(object)) {
    // eslint-disable-next-line array-callback-return
    object.map((element, index) => {
      generatePath(`${base}[${index}]`, element);
    });
  }

  //an object
  else {
    for (var key in object) {
      let newBase = base + "." + key.toString().toLowerCase();
      if (typeof object[key] === "object") {
        generatePath(newBase, object[key]);
      } else {
        object[key] = newBase;
      }
    }
  }
};
