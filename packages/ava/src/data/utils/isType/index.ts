import { SPECIAL_BOOLEANS } from './constants';
import { isDateString } from './isDateString';

export function isNil(value: unknown) {
  return value === null || value === undefined || value === '' || Number.isNaN(value as number) || value === 'null';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumberString(value: string) {
  let hasDot = false;
  let tempValue = value;
  if (/^[+-]/.test(tempValue)) {
    tempValue = tempValue.slice(1);
  }
  for (let i = 0; i < tempValue.length; i += 1) {
    const char = tempValue[i];
    if (char === '.') {
      if (hasDot === false) {
        hasDot = true;
      } else {
        return false;
      }
    }
    if (char !== '.' && !/[0-9]/.test(char)) {
      return false;
    }
  }
  return tempValue.trim() !== '';
}

export function isNumber(value: unknown, checkString?: boolean): value is number {
  if (typeof value === 'number') return true;
  if (checkString && isString(value)) return isNumberString(value as string);
  return false;
}

export function isInteger(value: unknown, checkString?: boolean) {
  if (typeof value === 'number') return Number.isInteger(value);
  if (checkString && isString(value) && isNumberString(value as string)) return !(value as string).includes('.');
  return false;
}

export function isFloat(value: unknown, checkString?: boolean) {
  if (typeof value === 'number') return !Number.isNaN(value) && !Number.isInteger(value);
  if (checkString && isString(value) && isNumberString(value as string)) return (value as string).includes('.');
  return false;
}

export function isDate(value: unknown, checkString?: boolean): boolean {
  if (value && Object.getPrototypeOf(value) === Date.prototype) return true;
  if (checkString && isString(value)) return isDateString(value as string);
  return false;
}

export function isBoolean(value: unknown, checkSpecialBoolean?: boolean) {
  return checkSpecialBoolean
    ? SPECIAL_BOOLEANS.some((list: unknown[]) => {
        return (value as unknown[]).every((item: unknown) => list.includes(item));
      })
    : typeof value === 'boolean';
}

export function isObject(value: unknown) {
  return value && Object.getPrototypeOf(value) === Object.prototype;
}

export function isArray(value: unknown) {
  return Array.isArray(value);
}

export function isBasicType(value: unknown) {
  return !isArray(value) && !isObject(value);
}
