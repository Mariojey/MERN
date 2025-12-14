import "dotenv/config"
import express, {type Request, type NextFunction, type Response} from "express"
import morgan from "morgan"
import cors from "cors"

import informationRoutes from "./routes/informationsRoutes.ts"
import createHttpError, {isHttpError} from "http-errors";

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());


app.use("/api/informations", informationRoutes);

app.use((req, res, next) => {

    next(createHttpError(404, "Not found endpoint"))

});



// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
        
    console.error(error);
    
    let errorMessage = "Error occurred";
    let statusCode = 500;

    if(isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }

    res.status(statusCode).json({ error: errorMessage });
});

export default app;