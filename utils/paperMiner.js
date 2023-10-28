const MINE_PAPER = (text) => {
    const normalized = text.toLowerCase()

    const conclusionMatch = normalized.match(/conclusions?/);
    const conclusionIndex = conclusionMatch?.index;

    const abstractMatch = normalized.match(/abstract/);
    const abstractIndex = abstractMatch?.index;

    const introductionMatch = normalized.match(/intoduction/);
    const introductionIndex = introductionMatch?.index;

    const conclusion = conclusionIndex ? normalized.slice(conclusionIndex + 10, conclusionIndex + 1010) : ''
    const abstract = abstractIndex ? normalized.slice(abstractIndex + 10, abstractIndex + 1010) : ''
    const introduction = introductionIndex? normalized.slice(introductionIndex + 10, introductionIndex + 1010) : ''

    return abstract + ' ' + conclusion + ' ' + introduction
    
}

module.exports = {
    MINE_PAPER
}