import { toast } from '@baronha/ting';
import type { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { Dimensions, Platform } from 'react-native';
import { twMerge } from 'tailwind-merge';

export const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('screen');

export const WIDTH = width;
export const HEIGHT = height;

// for onError react queries and mutations
export const showError = (error: AxiosError) => {
  console.log(JSON.stringify(error?.response?.data));
  const description = extractError(error?.response?.data).trimEnd();

  toast({
    title: 'Error',
    message: description,
    preset: 'error',
    haptic: 'error',
  });
};

export const showErrorMessage = (message: string = 'Something went wrong ') => {
  toast({
    title: 'Error',
    message,
    preset: 'error',
    haptic: 'error',
  });
};

export const extractError = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    const messages = data.map((item) => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map((item) => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
