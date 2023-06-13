import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv'

const app = express();
import UserRouter from './routes/user/route'
import mongoose from 'mongoose'
import AuthRouter from './routes/auth/route'
import PostRouter from './routes/post/route'
import CategoryRouter from './routes/category/route';
import CommentRouter from './routes/comment/route';
import {auth} from "./middleware/jwt";
import {setup} from "./utils/setup";

app.use(bodyParser.json())
app.use(cors())
dotenv.config()

app.use('/categories', CategoryRouter)
app.use('/posts', PostRouter)
app.use('/auth', AuthRouter)
app.use('/users', auth, UserRouter)
app.use('/comments', auth, CommentRouter)

app.listen(4000, 'localhost', async () => {
    console.log('Backend connected')
    mongoose.connect(process.env.MONGODB_URI!).then(r => {
        console.log('Database connected')
    })

    if (process.env.INITIAL_MODE!) {
        await setup()
    }
})
