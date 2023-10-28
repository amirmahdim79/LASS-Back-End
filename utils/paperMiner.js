const MINE_PAPER = (text) => {
    const normalized = text.toLowerCase()

    const conclusionMatch = normalized.match(/conclusions?/);
    const conclusionIndex = conclusionMatch.index;

    const abstractMatch = normalized.match(/abstract/);
    const abstractIndex = abstractMatch.index;

    const conclusion = normalized.slice(conclusionIndex + 10, conclusionIndex + 1010);
    const abstract = normalized.slice(abstractIndex + 10, abstractIndex + 1010);

    return abstract + ' ' + conclusion
    
}

module.exports = {
    MINE_PAPER
}