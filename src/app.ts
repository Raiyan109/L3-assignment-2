import { Application, Request, Response } from "express";

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const app: Application = express()

app.use(express.json())
app.use(cors())


app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
  })

  export default app