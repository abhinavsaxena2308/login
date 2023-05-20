import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL);

        if(connection.readyState == 1){
            return Promise.resolve(true);
            console.log("db connected...")
        }
    } catch (error) {
        return Promise.reject(error);
        console.log(error)
    }
}

export default connectMongo; 