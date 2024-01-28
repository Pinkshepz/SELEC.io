// Shuffle items in array
export function shuffle(array: Array<any>) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle
    while (currentIndex > 0) {
  
      // Pick a remaining element
      randomIndex = Math.floor(((1000 * Math.random()) * (1000 * Math.random())) % array.length);
      currentIndex--;
  
      // And swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

export function arrayOfArrayToObject(arrayOfArray: Array<Array<any>>) {
    //  Convert             To
    //      [                   {
    //          [a, 1],             a: 1,
    //          [b, 2],             b: 2,
    //          [c, 3]              c: 3
    //      ]                    }
    let object: {[key: string]: any} = {};

    // Loop for each array
    for (let index = 0; index < arrayOfArray.length; index++) {
        const element: Array<any> = arrayOfArray[index];
        object[element[0]] = element[1];
    }

    return object;
}
