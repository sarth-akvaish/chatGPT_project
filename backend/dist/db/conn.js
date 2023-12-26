import { connect, disconnect } from 'mongoose';
async function connectDB() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot Connect to DB");
    }
}
async function disconnectDB() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot Connect to DB");
    }
}
export { connectDB, disconnectDB };
//# sourceMappingURL=conn.js.map