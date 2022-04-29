import { model, Schema } from 'mongoose';

const Admin = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    password: {
        type: String,
    },
    name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    passwordChangedAt: {
        type: Date,
    }

});

export default model('Admin', Admin);