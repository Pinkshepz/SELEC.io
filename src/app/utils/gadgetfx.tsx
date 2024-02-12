import { type } from "os";

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

export function arrayToChips(text: any) {
    if (typeof text === "string") {
        if ((text[0] == "[") && (text[text.length - 1] == "]")) {
            const parsed_text = text.slice(1, -1).split(", ");
            let chips: Array<React.ReactNode> = []
            parsed_text.map((_text) => {
                chips.push(
                    <div className="px-2 rounded-xl border-2 border-indigo-600/70 dark:border-indigo-500/70 bg-indigo-600/10 dark:bg-indigo-500/10" key={_text}>
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
