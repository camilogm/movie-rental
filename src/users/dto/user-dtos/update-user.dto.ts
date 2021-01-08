import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ExcludeField } from '../../../common/decorators/exclude-field.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * This exclude is only for the client
   * You can use the field if you want do manually set of parameter
   */
  @ExcludeField('password')
  @ApiHideProperty()
  password?: string;
}
