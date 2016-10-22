
//----------------------variable declaration-------

var header=[];
var cato_edu={};
var cat=[];
var count=0;
var arr=[];
var inst;
var state=[];

//--------------------------------------------------


var fs = require('fs'),
readline = require('readline');

var rd = readline.createInterface({

input: fs.createReadStream('../data.csv'), //--------input stream
output:fs.createWriteStream('Censusedu.json'), //-----output stream

});

rd.on('line', function(line) {

  censusII(line); //-------------calling function sensexII()

});

rd.on('close',function()
{   

 pushinarry(cato_edu); //-----------calling function pushinarray() 
 rd.output.write(JSON.stringify(cat)); //--------converting array of objects in JSON and writing output in file

});

function censusII(text)
{

  if(count==0)
  {
    header=text.split(',');  //----------converting text in array and storing text in header, by using spit
    count++;  //--------------incrementing count
    inst=header.indexOf("Area Name");
    inTRU=header.indexOf("Total/ Rural/ Urban");
    inage=header.indexOf("Age-group");
    state.push(header[inst]); 
  }
  else
  {
    a=text.split(',');  //----------converting text in array and storing text in a, by using spit
    if(a[inTRU] == "Total" )
      if(a[inage]=="All ages")
      {
        if((state.indexOf(a[inst])<0))  //-------condition to check if duplicate data of state is not stored
        {
          state.push(a[inst]);    
          for(index=15;index<44;index+=3)

          {
            var eduValue = header[index] 
            var totalValue = parseInt(a[index]); 

            if (eduValue in cato_edu) 
            {
              cato_edu[eduValue].totalPop += totalValue;   //-----adding and storing population category wise
            }

            else 
            {
              cato_edu[eduValue] = {eduCateg: eduValue, totalPop:totalValue };   
            }
          }
        }
      }
    }
  }


//--------------------------functon to change to array of object---------------------------

function pushinarry(obj)
{
 for (key in obj)
 {
    cat.push(obj[key]);   //-------------Push in array
  }
}