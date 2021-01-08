import { registerDecorator } from 'class-validator';

export function IsInCustomSort(property: string, allowedValues: string[]) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsInCustom',
      target: object.constructor,
      propertyName,
      constraints: [property],
      validator: {
        validate(value: any) {
          if (allowedValues?.includes(value.value)) return true;

          return false;
        },
        defaultMessage(): string {
          return `${allowedValues.join()} are the only values allowed, with prefix + or - `;
        },
      },
    });
  };
}
