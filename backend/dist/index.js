import app from "./app.js";
import { connectDB } from "./db/conn.js";
const PORT = process.env.PORT || 5000;
//connections
connectDB().then(() => {
    app.listen(PORT, () => console.log("Server running & connected to Database"));
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map