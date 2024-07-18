export interface IError {
  response?: {
    data: {
      message: string;
      validation?: {
        body: {
          message: string;
        };
      };
    };
  };
  message?: string;
}
