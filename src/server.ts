import express from 'express'

const server=express()

//routing
server.get('/',(req,res)=>{
    res.json('Desde GET')
})

server.post('/',(req,res)=>{
    res.json('Desde POST')
})

server.put('/',(req,res)=>{
    res.json('Desde PUT')
})

server.delete('/',(req,res)=>{
    res.json('Desde DELETE')
})

export default server