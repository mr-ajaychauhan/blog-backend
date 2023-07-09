import { connect } from 'mongoose'

export const connectToDatabase = async () => {
    try {
        await connect(`mongodb+srv://admin:1122@cluster0.cgevu7b.mongodb.net/?retryWrites=true&w=majority`);
    } catch (error) {
        console.log(error);
        return error;
    }
}   