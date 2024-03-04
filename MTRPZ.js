const markdownCloseCheck = (indexes) => {
    if (indexes.length % 2 !== 0) {
        console.log(`Invalid markdown, tags not closed`)
        return false
    }
    return true
}

const markdownInsideOtherMarkdownCheck = (
    indexesInside,
    indexesOutside,
    deleteFlag = false
) => {
    for (let i = 0; i < indexesInside.length; i++) {
        for (let j = 0; j < indexesOutside.length; j += 2) {
            if (indexesInside[i] > indexesOutside[j] && indexesInside[i] < indexesOutside[j + 1]) {
                if (deleteFlag) {
                    indexesInside.splice(i, 1)
                    i--
                } else {
                    console.log(
                        `Invalid markdown, tags inside tags`
                    )
                    return false
                }
            }
        }
    }
    return true
}

const tagsInsideOtherTagsCheck = (checkIndexes) => {
    for (let i = 0; i < checkIndexes.length; i++) {
        for (let j = 0; j < checkIndexes.length; j++) {
            if (i !== j) {
                const x1 = markdownInsideOtherMarkdownCheck(checkIndexes[i], checkIndexes[j])
                const x2 = markdownInsideOtherMarkdownCheck(checkIndexes[j], checkIndexes[i])
                if (!x1 || !x2) {
                    return false
                }
            }
        }
    }
    return true
}

const deleteAllIndexesInsidePreformatted = (checkIndexes, preformattedIndexes) => {
    for (let i = 0; i < checkIndexes.length; i++) {
        markdownInsideOtherMarkdownCheck(checkIndexes[i], preformattedIndexes, true)
    }
}

const isMarkdownCorrect = (bolds, italics, monospaceds, preformatteds) => {

    const isPreformattedMarkdownCorrect = markdownCloseCheck(preformatteds)


    const checkObjects = [bolds, italics, monospaceds]
    // Deleting all indexes that are inside preformatted
    deleteAllIndexesInsidePreformatted(checkObjects, preformatteds)

    const correctLocated = tagsInsideOtherTagsCheck(checkObjects)

    const isBoldMarkdownCorrect = markdownCloseCheck(bolds)
    const isItalicMarkdownCorrect = markdownCloseCheck(italics)
    const isMonospacesMarkdownCorrect = markdownCloseCheck(monospaceds)
    if (
        !isBoldMarkdownCorrect ||
        !isItalicMarkdownCorrect ||
        !isMonospacesMarkdownCorrect ||
        !isPreformattedMarkdownCorrect
    ) {
        return false
    }
    return correctLocated
}
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

     const isCorrect = isMarkdownCorrect(
        bolds,
        italics,
        monospaceds,
        preformatteds
    )
    if (!isCorrect) {
        return false
    }
}



parseMarkdown("**Test**");
