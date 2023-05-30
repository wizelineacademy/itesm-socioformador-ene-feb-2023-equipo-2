export function parseJsonString(string: any) {
    console.log("string raw", string?.infoabout)
    //removing breakpoints and "/" characters
    let cleanString = string.replace(/\\n|\\r|\//gm, "");

    const replacements = {
        'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
        'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
        'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
        'ñ': 'n',
        'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
        'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y'
      };
    
    const replaceAccentedCharacters = (text: string): string => {
        const pattern = /[àáâãäåèéêëìíîïñòóôõöùúûüýÿ]/g;
        return text.replace(pattern, (match) => replacements[match] || match);
    };

    cleanString = replaceAccentedCharacters(cleanString);

    //removing non printable characters
    cleanString = cleanString.replace(/[^\x20-\x7E]/g, '');
    
    //cleanString = cleanString.replace(/\S/g, '');
    cleanString = cleanString.slice(1, cleanString.length-1)
    cleanString = JSON.stringify(cleanString)

    console.log("string cleaned", cleanString)

    let parsedJson = JSON.parse(cleanString)

    let finalJson = JSON.parse(parsedJson);

    return finalJson;

    
      
}