import { StatusMap, t } from 'elysia';

export const TodoStatusErrors = [
  StatusMap['Bad Request'],
  StatusMap['Not Found'],
  StatusMap['Internal Server Error'],
] as const;

export const TodoResponseErrors = t.Object({
  status: t.Number(),
  name: t.String(),
  message: t.String(),
});

export const TodoStatusMapErrors = TodoStatusErrors.reduce(
  (acc, cur) => {
    acc[cur] = TodoResponseErrors;
    return acc;
  },
  {} as Record<number, typeof TodoResponseErrors>,
);

export type TodosStatusCodes = (typeof TodoStatusErrors)[number];

export class TodoExeption extends Error {
  #statusCode: TodosStatusCodes;

  constructor(statusCode: TodosStatusCodes, message: string) {
    super(message);

    this.#statusCode = statusCode;
  }

  get statusCode() {
    return this.#statusCode;
  }
}
