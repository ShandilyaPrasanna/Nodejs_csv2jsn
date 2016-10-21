var header=[];
var cato_edu={};
var cat=[];
var count=0;
var arr=[];
var inst;
var state=[];

var fs = require('fs'),

readline = require('readline');


var rd = readline.createInterface({

  input: fs.createReadStream('../data.csv'),

  output:fs.createWriteStream('Censusedu.json'),

});

rd.on('line', function(line) {

  sensexII(line);
});

rd.on('close',function()
{   


 pushinarry(cato_edu);


 rd.output.write(JSON.stringify(cat)); 
});

function sensexII(text)
{
  if(count==0)
  {
    header=text.split(',');


    count++;
    inst=header.indexOf("Area Name");
    inTRU=header.indexOf("Total/ Rural/ Urban");
    inage=header.indexOf("Age-group");
    state.push(header[inst]);



  }
  else

  {
    count++;
    a=text.split(',');

    if(a[inTRU] == "Total" )
      if(a[inage]=="All ages")

      {
        if((state.indexOf(a[inst])<0))
        {


          state.push(a[inst]);    



          for(index=15;index<44;index+=3)

          {



            var eduValue = header[index]

            var totalValue = parseInt(a[index]);

            if (eduValue in cato_edu) {


              cato_edu[eduValue].totalPop += totalValue;

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


  function pushinarry(obj)
  {
   for (key in obj)

   {

    cat.push(obj[key]);

  }

}