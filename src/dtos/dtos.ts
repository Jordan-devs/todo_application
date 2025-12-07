export interface RegisterUserDTO {
  username: string;
  password: string;
}

export interface LoginUserDTO {
  username: string;
  password: string;
}

export interface ParamsIdDTO {
  id: string;
}

export interface CreateTodoDTO {
  title: string;
}

export interface UpdateTodoDTO {
  id: number;
  title?: string;
  completed?: boolean;
}
