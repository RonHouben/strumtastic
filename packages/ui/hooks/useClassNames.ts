export const useClassNames = () => {
  return {
    classNames: (...str: string[]): string => str.join(' ')
  };
};
