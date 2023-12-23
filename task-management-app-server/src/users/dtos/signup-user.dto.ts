import { Exclude, Expose } from "class-transformer";

export class SignupUserDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  city: string;
  @Expose()
  phone: string;

  @Exclude()
  password: string;

  @Exclude()
  id: string;

  @Expose()
  designation: string;
  @Expose()
  created_at: Date;
  @Expose()
  updated_at: Date;
}
