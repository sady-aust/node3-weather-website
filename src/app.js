const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('../src/utils/geocode');
const foreCast = require('../src/utils/forecast');
const app = express();

//Define paths from express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsDirectory = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


//setup handlebars engine and location
app.set('view engine','hbs');
app.set('views',viewsDirectory);

//set up partials
hbs.registerPartials(partialsPath);

//Setup Static Directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Toufiqul Islam'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name:'Sadi'
    });
});


app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        msg: 'Help Me',
        name:'Sadi'
    });
});
app.get('/weather', (req, res) => {
    if(!req.query.address){
      return res.send('Please provide an address');
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:error})
        }
        else{
            foreCast(latitude,longitude,(error,result)=>{
                if(error){
                   return res.send({error:error});
                }
                else{
                    res.send({result})
                }

            });
        }
    });


});

app.get('/help/*', (req, res) => {
    res.render('error',{
        title:"404",
        name:'Sadi',
        error:"Help Page Not Found"
    })
});

app.get('*', (req, res) => {
   res.render('error',{
       title:"404",
       name:'Sadi',
       error:"Page Not Found"
   })
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
});
