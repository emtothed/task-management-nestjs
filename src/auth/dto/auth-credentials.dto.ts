import {
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MaxLength(32)
  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters',
    },
  )
  password: string;

  /*COURSE METHOD FOR PASSWORD VALIDATION \/ \/ \/
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:'Password is weak.'})
  password: string;
  */
}
