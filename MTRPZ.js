
const parseMarkdown = (markdown) => {
    const italics = []
    const bolds = []
    const preformatteds = []
    const newParagraphs = []
    const monospaceds = []
    const markSymbols = ['*', '_', '`', ' ', '\n', undefined]
    const markSymbolsCheck = (i) => {
        return markSymbols.includes(markdown[i])
    }
    for (let i = 0; i < markdown.length; i++) {
        const boldsCondition = (markSymbolsCheck(i - 1) || markSymbolsCheck(i + 2)) &&
        markdown[i] === '*' &&
        markdown[i + 1] === '*'

        const italicsCondition = (markSymbolsCheck(i - 1) || markSymbolsCheck(i + 1)) &&
        markdown[i] === '_' 

        const preformattedsCondition = (markSymbolsCheck(i - 1) || markSymbolsCheck(i + 3)) &&
        markdown[i] === '`' &&
        markdown[i + 1] === '`' &&
        markdown[i + 2] === '`' 

        const monospacedsCondition = (markSymbolsCheck(i - 1) || markSymbolsCheck(i + 1)) && 
        markdown[i] === '`'
        
        const newParagraphsCondition = (markSymbolsCheck(i - 1) || markSymbolsCheck(i + 2)) &&
        markdown[i] === '\n' &&
        markdown[i + 1] === '\n' 

        if (boldsCondition ) {
            bolds.push(i)
            i++
        } else if (
            italicsCondition
        ) {
            italics.push(i)
        } else if (
            preformattedsCondition
        ) {
            preformatteds.push(i)
            i += 2
        } else if (
            monospacedsCondition
        ) {
            monospaceds.push(i)
        } else if (
            newParagraphsCondition
        ) {
            newParagraphs.push(i)
        }
    }
     console.log("italics",italics,);
     console.log("bolds",bolds);
     console.log("preformatteds",preformatteds);
     console.log("newParagraphs",newParagraphs);
     console.log("monospaceds",monospaceds);
}

parseMarkdown("**Test**");
