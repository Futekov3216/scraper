const Links = require('./links.js')
const fs = require('fs');
Links.map((req, index) => {
    return fs.writeFile(`${index}.txt`, {flag: 'wx', flag:'w'}, function (err) {
        if (err) throw err;
        // console.log(`NOV EPIZOD: ${alias}  ====>  ` + `${link}`)
        // console.log('Saved!');
    });
})

