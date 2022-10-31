const path = require('path')    // Library that allows to access absolute path

/*
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    const result = words.filter(word => word.length > 6);
    
    console.log(words);
    console.log(result);
*/

// TO BE ADDED INTO ROUTE/API .... 
ary = [{"id":"dd9d690c-52c2-4397-a882-bc81566e2390","title":"title 4","text":"note 4"},{"id":"87f7eb71-4cb4-4c5b-a068-e21cf0780e92","title":"note 2","text":"nrew note 2"}]
console.log('=========');
//console.log(ary, '</br>')
console.log('')
// ifVal = ary[0['id']]
// console.log(ifVal)
secAry = ary.filter(x => x.id != "dd9d690c-52c2-4397-a882-bc81566e2390");
console.log(secAry)
