/*
 * J Gibbens 2014
 * so to keep all my text as it should be I have my own "special character" list
 */
function specialCharacters_display(txt) {
    if (txt != null && txt != undefined) {
        txt = txt.replace(/¤59¤/gi, ';');
        txt = txt.replace(/¤39¤/gi, "'");
        txt = txt.replace(/¤34¤/gi, '"');
        txt = txt.replace(/¤58¤/gi, ':');
        txt = txt.replace(/¤40¤/gi, '(');
        txt = txt.replace(/¤41¤/gi, ')');
        txt = txt.replace(/¤91¤/gi, '[');
        txt = txt.replace(/¤93¤/gi, '\]');
        txt = txt.replace(/¤96¤/gi, '`');
        txt = txt.replace(/¤126¤/gi, '~');
        txt = txt.replace(/¤123¤/gi, '{');
        txt = txt.replace(/¤125¤/gi, '}');
        txt = txt.replace(/¤44¤/gi, ',');
        txt = txt.replace(/¤45¤/gi, ')');
        txt = txt.replace(/¤46¤/gi, '(');
    }
    return txt;
}