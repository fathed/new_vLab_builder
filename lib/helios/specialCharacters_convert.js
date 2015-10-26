/*
 * J Gibbens 2014
 * so to keep all my text as it should be I have my own "special character" list
 */

function specialCharacters_convert(txt){
	if(txt.match(/;/gi)){
		txt = txt.replace(/;/gi, "¤59¤");
	}else if(txt.match(/'/gi)){
		txt = txt.replace(/'/gi, "¤39¤");
	}else if(txt.match(/"/gi)){
		txt = txt.replace(/"/gi, "¤34¤");
	}else if( txt.match(/:/gi)){
		txt = txt.replace(/:/gi, "¤58¤");
	}else if(txt.match(/\(/gi)){
		txt = txt.replace(/\(/gi, "¤40¤");
	}else if(txt.match(/\)/gi)){
		txt = txt.replace(/\)/gi, "¤41¤");
	}else if(txt.match(/\[/gi)){
		txt = txt.replace(/\[/gi, "¤91¤");
	}else if(txt.match(/]/gi)){
		txt = txt.replace(/]/gi, "¤93¤");
	}else if(txt.match(/`/gi)){
		txt = txt.replace(/`/gi, "¤96¤");
	}else if(txt.match(/~/gi)){
		txt = txt.replace(/~/gi, "¤126¤");
	}else if(txt.match(/{/gi)){
		txt = txt.replace(/{/gi, "¤123¤");
	}else if(txt.match(/}/gi)){
		txt = txt.replace(/}/gi, "¤125¤");
	}else if(txt.match(/,/gi)){
		txt = txt.replace(/,/gi, "¤44¤");
	}else if(txt.match(/\)/gi)){
		txt = txt.replace(/\)/gi, "¤45¤");
	}else if(txt.match(/\(/gi)){
		txt = txt.replace(/\(/gi, "¤46¤");
	}
	return txt;
}