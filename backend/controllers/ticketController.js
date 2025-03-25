const asyncHandler=require('express-async-handler')
const User=require('../models/usermodel')
const Ticket=require('../models/ticketModel')


//@route GET /api/tickets
const getTickets=asyncHandler(async(req,res)=>{
    //get user using the id int JWT
    const user=await User.findById(req.user.id)
    if(!user)
    {
        res.status(401)
        throw new Error('Error not found')
    }
    const tickets=await Ticket.find({user:req.user.id})
res.status(200).json(tickets)
})
//@route GET /api/tickets/:id
const getTicket=asyncHandler(async(req,res)=>{
    //get user using the id int JWT
    const user=await User.findById(req.user.id)
    if(!user)
    {
        res.status(401)
        throw new Error('Error not found')
    }
    const ticket=await Ticket.findById(req.params.id)
    if(!ticket)
    {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString()!==req.user.id)
    {
        res.status(401)
        throw new Error('Not Authorized')
    }
res.status(200).json(ticket)
})
//@route POST /api/tickets
const createTicket=asyncHandler(async(req,res)=>{

    const {product,description}=req.body
    console.log(product)
    if(!product||!description)
    {
        res.status(401)
        throw new Error('Please add product and description')
    }
    const user=await User.findById(req.user.id)
    if(!user)
    {
        res.status(401)
        throw new Error('Error not found')
    }
    const ticket=await Ticket.create({
        product,
        description,
        user:req.user.id,
        status:'new'
    })
    res.status(201).json(ticket)
    })
//@route DELETE /api/tickets/:id
const deleteTicket=asyncHandler(async(req,res)=>{
    //get user using the id int JWT
    const user=await User.findById(req.user.id)
    if(!user)
    {
        res.status(401)
        throw new Error('Error not found')
    }
    const ticket=await Ticket.findById(req.params.id)
    if(!ticket)
    {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString()!==req.user.id)
    {
        res.status(401)
        throw new Error('Not Authorized')
    }
    await Ticket.findByIdAndDelete(req.params.id)
res.status(200).json({success:true})
})
//@route PUT /api/tickets/:id
const updateTicket=asyncHandler(async(req,res)=>{
    //get user using the id int JWT
    const user=await User.findById(req.user.id)
    if(!user)
    {
        res.status(401)
        throw new Error('Error not found')
    }
    const ticket=await Ticket.findById(req.params.id)
    if(!ticket)
    {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString()!==req.user.id)
    {
        res.status(401)
        throw new Error('Not Authorized')
    }
    const uticket=await Ticket.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.status(200).json(uticket)
})
    module.exports={
        getTickets,createTicket,getTicket,deleteTicket,updateTicket
    }