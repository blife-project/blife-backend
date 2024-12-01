export class LoginPayloadDto {
  constructor(
    public username: string,
    public password: string,
  ) {}
}

export class LoginDto {
  constructor(public token: string) {}
}
