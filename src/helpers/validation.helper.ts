import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsEqualTo implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const comparator = args.object[args.constraints[0]];
    return value === comparator;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} didn't match with ${args.constraints[0]}`;
  }
}
