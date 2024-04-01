// Shuffle items in array
export function shuffle(array: Array<any>) {
    // Copy new array
    let c_array = [...array];

    let currentIndex = c_array.length, randomIndex;
  
    // While there remain elements to shuffle
    while (currentIndex > 0) {
  
      // Pick a remaining element
      randomIndex = Math.floor(((1000 * Math.random()) * (1000 * Math.random())) % c_array.length);
      currentIndex--;
  
      // And swap it with the current element
      [c_array[currentIndex], c_array[randomIndex]] = [
        c_array[randomIndex], c_array[currentIndex]];
    }
  
    return c_array;
}

export function searchObjectFilter(object: {[key: string]: any}, searchKey: string) {
    let filteredObject: {[key: string]: any} = {};

    for (let objectKey of Object.keys(object) as string[]) {
        if (JSON.stringify(object[objectKey]).toLocaleLowerCase().includes(
            searchKey.toLocaleLowerCase()
        ) === true) {
            filteredObject[objectKey] = object[objectKey];
        }
    }

    return filteredObject;
}

export function classConcatenate(...strings: any) {
    let concat_sting = ""
    // Concat each string with " " between
    for (let string of strings) concat_sting += (string + " ");

    return concat_sting;
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

export function arrayToChips(text: any) {
    if (typeof text === "string") {
        if ((text[0] == "[") && (text[text.length - 1] == "]")) {
            const parsed_text = text.slice(1, -1).split(", ");
            let chips: Array<React.ReactNode> = []
            parsed_text.map((_text) => {
                chips.push(
                    <div className="px-2" key={_text}>
                        {_text}
                    </div>
                )
            })
            return chips;
        } else {
            return text;
        }
    } else {
        return text;
    }
}
