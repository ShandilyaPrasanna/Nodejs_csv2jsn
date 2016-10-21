


count=0; 
var sta = {};
var person = {};
var a=[];
var header=[];
var stKey;
var array = [];
var inage ; 
var inTRU ;
var inTp;
var inst; 
var state=[];

var fs = require('fs'),

readline = require('readline');


var rd = readline.createInterface({

    input: fs.createReadStream('../data.csv'),

    output:fs.createWriteStream('urban.json'),

});



rd.on('line', function(line) {

    urbanization(line);
});


rd.on('close',function()
{   

    array.sort(compare);
    rd.output.write(JSON.stringify(array));   

});




function urbanization(text)
{
    if(count==0)
    {
        header=text.split(',');

        
        count++;

        inTRU=header.indexOf("Total/ Rural/ Urban");
        inage=header.indexOf("Age-group");
        inTp=header.indexOf("Total Persons");
        inst=header.indexOf("Area Name");
        count ++;
        state.push(header[inst]);

    }
    else

    {




        a=text.split(',');

        if(a[inTRU]=="Total")
            if(a[inage]=="All ages")
            {
                if((state.indexOf(a[inst])<0))
                {


                 state.push(a[inst]);    



                 stKey=a[inst];

                 if(stKey in sta)

                 {

                    sta[stKey].person += a[inTp];   

                    array.push(sta[stKey]);
                }

                else {


                    sta[stKey] = {};


                    sta[stKey].stGroup = stKey;


                    sta[stKey].person = a[inTp];       

                    array.push(sta[stKey]);


                }    

            }
            
            state.push(a[inst]);

        }

    }



}   

function compare(a,b) {
    return(a.person-b.person);
}
