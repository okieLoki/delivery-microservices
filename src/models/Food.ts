import mongoose, {
    Schema,
    Document,
    Model
} from "mongoose";

interface IFoodDoc extends Document {
    vendorId?: Schema.Types.ObjectId;
    name: string;
    description: string;
    category?: string;
    price: number;
    foodType: string;
    readyTime?: number;
    rating: number;
    images: [string];
}

const foodSchema = new Schema<IFoodDoc>({
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    foodType: { type: String, required: true },
    readyTime: { type: Number },
    rating: { type: Number },
    images: { type: [String] }
},
    {
        toJSON: {
            transform: (_, ret) => {
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        },
        timestamps: true
    }
);

const Food: Model<IFoodDoc> = mongoose.model<IFoodDoc>('Food', foodSchema);

export { Food }