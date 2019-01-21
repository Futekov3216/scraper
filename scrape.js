const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs');
const Links = require('./links.js')
const texts = []
fs.readdir('./', async (err, files) => {
    await files.filter(res => {
       if(res.indexOf('txt') > -1){
           texts.push(res)
       }
    })
    if (texts.length === Links.length) {
        console.log("AMAA")
        for (var i = 0; i < Links.length; i++) {
            console.log(texts)
            req(Links[i], texts[i])
        }
    } else{
        console.log("SRY")
    }
})

function req(link, doc){
    // console.log(doc)
    request(link,async (err, response, html) => {
        if(!err && response.statusCode == 200){
            const $ = cheerio.load(html)
            const ep = $('#load_ep')
            const ep_start = $('#episode_page a.active').attr('ep_start');
            const  ep_end = $('#episode_page a.active').attr('ep_end');
            var id = $("input#movie_id").val();
            var default_ep = $("input#default_ep").val();
            var alias = $("input#alias_anime").val();
            var url = 'https://ajax.apimovie.xyz/' + 'ajax/load-list-episode?ep_start=' + ep_start + '&ep_end=' + ep_end + '&id=' + id + '&default_ep=' + default_ep + '&alias=' + alias;
            console.log("URL", url)
            await request(url, async (err, res, html) => {
                if (!err && response.statusCode == 200) {
                    try{
                        const $ = await cheerio.load(html)
                        let check = await true;
                        let text;
                        let result = $('.name').text()
                        await fs.readFile(doc, 'utf8', function async (err, contents) {
                           if(result === contents){
                               check = false
                               console.log("NO NEW SHIT")
                               return
                           }else{
                               fs.writeFile(doc, result, function (err) {
                                   if (err) throw err;
                                   console.log(`NOV EPIZOD: ${alias}  ====>  ` + `${link}`)
                                   console.log('Saved!');
                               });
                            }
                        });
                    }catch(err){
                    console.log(err)
                    }
                }
            })
        }
    })
}

