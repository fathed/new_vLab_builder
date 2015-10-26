/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//I remove the white space and change forward slash to a dollar sign - only for foler and file names
function removeWhiteSpace(e) {
    var t = e.trim(),
            q = t.replace(/\//gi, '_'),
            m = q.replace(/ /gi, '_');
    return m;
}

