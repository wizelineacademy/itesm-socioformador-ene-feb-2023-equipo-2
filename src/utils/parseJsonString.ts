export function parseJsonString(string: any) {
    console.log("string raw", string?.infoabout)
    //removing breakpoints and "/" characters
    let cleanString = string.replace(/\\n|\\r|\//gm, "");
    //removing non printable characters
    cleanString = cleanString.replace(/[^\x20-\x7E]/g, '');
    //removing non ASCII characters
    cleanString = cleanString.replace(/[^\x00-\x7F]/g, '');
    cleanString = cleanString.replace(/\s/g, '');
    //cleanString = cleanString.replace(/\S/g, '');
    cleanString = cleanString.slice(1, cleanString.length-1)
    cleanString = JSON.stringify(cleanString)

    console.log("string cleaned", cleanString)

    let parsedJson = JSON.parse(cleanString)

    let finalJson = JSON.parse(parsedJson);

    return finalJson;

    
      
}