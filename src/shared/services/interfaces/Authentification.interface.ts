export interface AuthentificationBaseInterface {
  password: string
}

export interface LoginInterface extends AuthentificationBaseInterface {
  username: string
}

export interface RegisterInterface extends AuthentificationBaseInterface {
  email: string
  confirmPassword: string
}