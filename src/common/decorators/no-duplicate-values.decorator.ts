import { registerDecorator, ValidationOptions } from 'class-validator';

export function NonDuplicateValues(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNonPrimitiveArray',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          try {
            if (!Array.isArray(value)) return false;

            const fields = value.map((val) => val[property]);

            const set = new Set(fields);
            if (set.size !== fields.length) return false;

            return true;
          } catch (error) {
            return false;
          }
        },
        defaultMessage(): string {
          return `The field ${property} must no be duplicated `;
        },
      },
    });
  };
}
