import icon from './test.png';

export const shouldPass = icon;

export const shouldFailTsc: string = icon as number;

export const shouldFailEslint = icon as any;
