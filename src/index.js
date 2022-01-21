const path = require('path')
const express = require('express')
const hbs= require('hbs')
const request = require('request')
const forecast= require('./utils/forecast')
const geocode= require('./utils/geocode')

 
const app = express()
//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title : 'Weather-App',
        name : 'Vineet Bindal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Vineet Bindal'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext: 'Vineet Bindal need some help' ,
        title: 'Help',
        name: ' Vineet Bindal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error: 'Please provide a place'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({ error})
            }

            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })

    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Vineet Bindal',
        errorMessage: 'Help article not found'
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            errror:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Vineet Bindal',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
})