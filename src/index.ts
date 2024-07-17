import app from "./app";
import * as dotenv from "dotenv";

// get dotenv values
dotenv.config();

// init express
app.listen(process.env.PORT, () => {
    return console.log(`server is listening on ${process.env.PORT}`);
});

// wakatime stats: https://wakatime.com/api/v1/users/Quasarity/stats
