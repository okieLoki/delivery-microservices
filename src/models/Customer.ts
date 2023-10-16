import mongoose,
{
    Document,
    Schema,
    Model,
}
    from "mongoose";

interface ICustomer extends Document {
    email: string;
    password: string;
    salt: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone: string;
    verified: boolean;
    otpPhone: number;
    otpEmail: number;
    otp_expiry: Date;
    lat?: number;
    lng?: number;
}

const CustomerSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phone: { type: String, required: true },
    verified: { type: Boolean, default: false },
    otpPhone: { type: Number, required: true },
    otpEmail: { type: Number, required: true },
    otp_expiry: { type: Date, required: true },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
},
    {
        toJSON: {
            transform: (_, ret) => {
                delete ret.password;
                delete ret.salt;
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
                return ret;
            }
        },
        timestamps: true,
    },
);

const 

Customer: Model<ICustomer> = mongoose.model<ICustomer>("Customer", CustomerSchema);

export { Customer };