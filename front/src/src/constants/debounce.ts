export const debounce = (f: Function, interval: number) => {
  let timer: any = null;
  return (value: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => f(value), interval);
  };
};

export const debouncePromise = (f: Function, interval: number) => {
  let timer: any = null;
  return (_: any, value: any) => {
    clearTimeout(timer);
    return new Promise((resolve, reject) => {
      timer = setTimeout(() => f(value, resolve, reject), interval);
    });
  };
};
