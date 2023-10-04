import mongoose, { Schema, Document, Model } from "mongoose";

interface IVendorDoc extends Document {
    name: string;
    ownerName: string;
    foodType: string[];
    pincode: string;
    address?: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable?: boolean;
    coverImage?: string[];
    rating?: number;
    foods?: any[];
}

const vendorSchema = new Schema<IVendorDoc>({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: [{ type: String }],
    pincode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, minlength: 10, maxlength: 10, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean },
    coverImage: [{ type: String }],
    rating: { type: Number },
    foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }]
},
    {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret.password;
                delete ret.salt;
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        },
        timestamps: true
    }
);

const Vendor: Model<IVendorDoc> = mongoose.model<IVendorDoc>('Vendor', vendorSchema);

export { Vendor }
