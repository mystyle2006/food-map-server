import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(6, {
    message: 'Invalid email format.',
  })
  @MaxLength(50, {
    message: 'Invalid email format.',
  })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'Invalid email format.',
  })
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'Email or password does not match.',
  })
  @MaxLength(20)
  @Matches(/^[a-zA-z0-9]*$/, {
    message: 'Password must contain only English letters and numbers.',
  })
  password: string;
}
