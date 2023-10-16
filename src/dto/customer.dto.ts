import {
    IsEmail,
    Length,
} from 'class-validator'


export class createCustomerInputs {

    @IsEmail()
    email: string;

    @Length(10, 10)
    phone: string;

    @Length(6, 12)
    password: string;

}

export class userInputLogin {
    @IsEmail()
    email: string;

    @Length(6, 12)
    password: string;
}

export interface customerPayload {
    _id: string;
    email: string;
    verified: boolean;
}