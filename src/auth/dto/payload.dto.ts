import { Expose } from 'class-transformer';

export class PayloadDTO {
  @Expose({ name: 'id' })
  sub: number;

  @Expose({ name: 'role' })
  userRole: string;

  @Expose({ name: 'userName' })
  username: string;
}
