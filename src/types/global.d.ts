declare global {
  interface Window {
    pay: (form: HTMLFormElement) => void;
  }
}

export {};