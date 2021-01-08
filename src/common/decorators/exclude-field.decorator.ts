import { registerDecorator, ValidationArguments } from 'class-validator';

export function ExcludeField(property: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ExcludeField',
      target: object.constructor,
      propertyName,
      constraints: [property],
      validator: {
        validate() {
          return false;
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} is not allowed for this feature `;
        },
      },
    });
  };
}
