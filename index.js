const fs = require('fs');

const func = async () => {
    const text = await new Promise((res, rej) => {
     fs.readFile('./scenario.txt', (err, data) => {
      if (err) {
       return rej(err);
      }
   
      return res(data.toString());
     });
    });

    {
        let a = text;
        const res = {};
        const b = [...a.matchAll(/^(Max|Geralt|Triss|Yennefer):/gmi)];
        for (let i = 0; i < b.length; i += 1) 
        {
            const match = b[i];
            const [_1, characterName] = match;
            const { index } = match;

            if (res[characterName]) 
            {
                
                res[characterName].push({
                    start: index,
                    end: b[i + 1] ? b[i + 1].index : -1,
                });
                


            } 
            else 
            {
                res[characterName] = [{
                    start: index,
                    end: b[i + 1] ? b[i + 1].index : -1
                }];
            }


           
        }
        console.log(res);
      
        const characters = {
            Max: "Max",
            Geralt: "Geralt",
            Yennefer: "Yennefer",
            Triss: "Triss"
        };
      
        for (const character in characters) {
            if (res[character]) {
                let content = '';
                for (let i = 0; i < res[character].length; i += 1) {
                    const ab = text.slice(res[character][i].start, res[character][i].end);
                    content += ab + '\n';
                }
                fs.writeFileSync(`./${character}.txt`, content, { encoding: 'utf-8' });
            }
        }   

    }
   };
   
   func();
      
