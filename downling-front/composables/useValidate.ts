export interface PasswordValidatorOptions {
  minLength?: number
  maxLength?: number
  hasCapitalCaseLetters?: boolean
  hasLowerCaseLetters?: boolean
  hasNumerals?: boolean
}

export type ValidationPair = {
  isValid: boolean
  message: string
}

export const useValidate = () => {
  const checkStringValidity = (input: string, options: PasswordValidatorOptions): ValidationPair => {
    if (options.minLength && input.length < options.minLength) {
      return { isValid: false, message: `Fields length is lower than required minimum of ${options.minLength}` }
    }

    if (options.maxLength && input.length > options.maxLength) {
      return { isValid: false, message: `Fields length is larger than required maximum of ${options.maxLength}` }
    }

    if (options.hasLowerCaseLetters) {
      const re = /[a-z]/
      const is = new RegExp(re).test(input)
      if (!is) {
        return { isValid: false, message: `Field does not include small characters` }
      }
    }

    if (options.hasCapitalCaseLetters) {
      const re = /[A-Z]/
      const is = new RegExp(re).test(input)
      if (!is) {
        return { isValid: false, message: `Field does not include capital letters` }
      }
    }

    if (options.hasNumerals) {
      const re = /[0-9]/
      const is = new RegExp(re).test(input)
      if (!is) {
        return { isValid: false, message: `Field does not include numeric values` }
      }
    }

    return { isValid: true, message: `` }
  }

  return {
    checkStringValidity,
  }
}
