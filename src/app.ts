import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { localStrategy } from "./strategies/localStrategy";
import passport from "passport";
import authRouter from './routes/auth'


const app = express();


//cors policy
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, PUT, POST, DELETE , OPTIONS",
  credentials: true,
  allowedHeaders:
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//cookie parser
app.use(cookieParser());

//statics files
app.use(express.static(path.resolve(__dirname, "..", "public")));


//passport 
passport.use(localStrategy)

//routes
app.use('/auth',authRouter)



//error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(500)
    .json({ mrssage: err.message ? err.message : "internal server error" });
});

export default app;
