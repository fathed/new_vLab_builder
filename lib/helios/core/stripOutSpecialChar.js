/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function stripOutSpecialChar(txt){
    if(txt.match(/;/gi)){
		txt = txt.replace(/;/gi, "");
	}else if(txt.match(/[\/'";:{()}]/gi)){
		txt = txt.replace(/[,\.'";:\[\]{()}]/gi, "");
	}
  
    
    return txt;
}
