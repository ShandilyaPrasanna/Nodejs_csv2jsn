

//----------------------variable declaration-------
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
//---------------------------------------------------

readline = require('readline');


var rd = readline.createInterface({

    input: fs.createReadStream('../data.csv'),  //--------input stream

    output:fs.createWriteStream('urban.json'), //-----output stream


});



rd.on('line', function(line) {

    urbanization(line); //-------------calling function urbanization()
});



rd.on('close',function()
{   

    array.sort(compare); //--------------calling compare in sort
    rd.output.write(JSON.stringify(array));   //--------converting array of objects in JSON and writing output in file

});




function urbanization(text)
{
    if(count==0)
    {
        header=text.split(','); //----------converting text in array and storing text in header, by using spit

        
        count++;

        inTRU=header.indexOf("Total/ Rural/ Urban");
        inage=header.indexOf("Age-group");
        inTp=header.indexOf("Total Persons");
        inst=header.indexOf("Area Name");
        count ++;                             //--------------incrementing count
        state.push(header[inst]);

    }
    else

    {




        a=text.split(',');  //----------converting text in array and storing text in a, by using spit


        if(a[inTRU]=="Total")
            if(a[inage]=="All ages")
            {
                if((state.indexOf(a[inst])<0))  //-------condition to check if duplicate data of state is not stored
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
//--------------------------functon arrange object is decending order---------------------------

function compare(a,b) {
    return(b.person-a.person);
}
