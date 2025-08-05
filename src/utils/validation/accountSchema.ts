import * as yup from 'yup'

export const accountSchema = yup.object({
  name: yup.string().required('Название обязательно'),
  login: yup.string().required('Логин обязателен'),
  password: yup.string().required('Пароль обязателен'),
})
