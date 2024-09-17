import * as yup from 'yup'

const phoneNumberRules = yup
  .string()
  .matches(/^09\d*$/, 'شماره تلفن باید فقط باید شامل عدد باشد')
  .required('وارد کردن شماره تلفن الزامی است')
  .min(11, 'شماره تلفن باید ۱۱ رقمی باشد')
  .max(12, 'شماره تلفن باید  رقمی باشد')

const passwordRules = yup
  .string()
  .required('وارد کردن رمز عبور الزامی است')
  .min(6, 'رمز عبور باید ۶ رقمی باشد')
  .max(18, 'رمز عبور باید ۱۸ رقمی باشد')

const firstNameRule = yup
  .string()
  .matches(/^[\u0600-\u06FF\s]+$/, 'نام باید با حروف فارسی نوشته شود')
  .required('وارد کردن نام الزامی است')
  .min(3, 'نام باید حداقل ۳ حرفی باشد')

const lastNameRule = yup
  .string()
  .matches(/^[\u0600-\u06FF\s]+$/, 'نام خانوادگی باید با حروف فارسی نوشته شود')

  .required('وارد کردن نام خانوادگی الزامی است')
  .min(3, 'نام خانوادگی باید حداقل ۳ حرفی باشد')

const postalCodeRule = yup
  .string()

  .required('وارد کردن کد پستی الزامی است')
  .min(10, 'کد پستی باید ۱۰ رقمی باشد')
  .max(11, 'کد پستی باید ۱۰ رقمی باشد')

const addressRule = yup
  .string()
  .required('وارد کردن آدرس محل سکونت الزامی است')

export const loginSchema = {
  phoneNumber: phoneNumberRules,
  password: passwordRules
}

export const accountCreationDepositSchema = {
  firstName: firstNameRule,
  lastName: lastNameRule,
  postalCode: postalCodeRule,
  address: addressRule
}
