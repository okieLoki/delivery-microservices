import {
    IsEmail,
    Length,
    ValidationOptions,
    ValidationArguments,
    registerDecorator
} from 'class-validator'

const IsOtpVerificationMethod = (validationOptions?: ValidationOptions) => {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isOtpVerificationMethod',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return value === 'sms' || value === 'email';
                },
                defaultMessage: (args: ValidationArguments) => {
                    return `${args.property} must be 'sms' or 'email'`;
                },
            },
        });
    };
  };

export class createCustomerInputs {

    @IsEmail()
    email: string;

    @Length(10, 10)
    phone: string;

    @Length(6, 12)
    password: string;

    @IsOtpVerificationMethod()
    otpVerificationMethod: string;
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