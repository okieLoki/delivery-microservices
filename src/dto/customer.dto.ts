import {IsEmail, IsEmpty, Length} from 'class-validator'

export class createCustomerInputs{

    @IsEmail()
    email: string;

    @Length(10, 10)
    phone: string;

    @Length(6, 12)
    password: string;
}