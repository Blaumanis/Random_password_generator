import React, { useEffect, useRef, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'

interface Props {
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

const PasswordGenerator = ({ setPassword }: Props) => {
  const [length, setLength] = useState(0)
  const [passwordStrength, setPasswordStrength] = useState('')

  const [isUpperCase, isSetUppercase] = useState(false)
  const [isLowerCase, isSetLowercase] = useState(false)
  const [isNumbers, isSetNumbers] = useState(false)
  const [isSymbols, isSetSymbols] = useState(false)

  const [checkedBoxes, setCheckedBoxes] = useState(0)

  const numbers = '0123456789'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const symbols = '+-_=$!?*&#.,:;@%^'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()

  const passwordRef = useRef<HTMLInputElement | null>(null)
  const handleLength = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.target.value))
    if(passwordRef.current !== null){
        const min = Number(passwordRef.current.min)
        const max = Number(passwordRef.current.max)
        const val = Number(passwordRef.current.value)
        passwordRef.current.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    }
  }

  const handleUpperCase = () => {
    isSetUppercase(!isUpperCase)
    if (!isUpperCase) {
      setCheckedBoxes((prev) => prev + 1)
    } else {
      setCheckedBoxes((prev) => prev - 1)
    }
  }

  const handleLowerCase = () => {
    isSetLowercase(!isLowerCase)
    if (!isLowerCase) {
      setCheckedBoxes((prev) => prev + 1)
    } else {
      setCheckedBoxes((prev) => prev - 1)
    }
  }

  const handleNumbers = () => {
    isSetNumbers(!isNumbers)
    if (!isNumbers) {
      setCheckedBoxes((prev) => prev + 1)
    } else {
      setCheckedBoxes((prev) => prev - 1)
    }
  }

  const handleSymbols = () => {
    isSetSymbols(!isSymbols)
    if (!isSymbols) {
      setCheckedBoxes((prev) => prev + 1)
    } else {
      setCheckedBoxes((prev) => prev - 1)
    }
  }

  useEffect(() => {
    if (length > 14 && checkedBoxes === 4) {
      setPasswordStrength('strong')
    } else if (length > 14 && checkedBoxes === 3) {
      setPasswordStrength('medium')
    } else if (length > 9 && checkedBoxes === 4) {
      setPasswordStrength('medium')
    } else if (length > 3 && checkedBoxes === 4) {
      setPasswordStrength('weak')
    } else if (length > 14 && checkedBoxes === 2) {
      setPasswordStrength('weak')
    } else if (length > 9 && checkedBoxes === 3) {
      setPasswordStrength('weak')
    } else if (length > 0 || (length > 0 && checkedBoxes === 1)) {
      setPasswordStrength('too-weak')
    } else {
      setPasswordStrength('')
    }
  }, [length, isUpperCase, isLowerCase, isNumbers, isSymbols])

  const handleGenerate = (e: React.SyntheticEvent) => {
    e.preventDefault()

    let lowerPassword = ''
    let upperPassword = ''
    let numbersPassword = ''
    let symbolsPassword = ''

    if (isUpperCase) {
      for (let i = 0; i < length; i++) {
        upperPassword += upperCaseLetters.charAt(
          Math.floor(Math.random() * upperCaseLetters.length),
        )
      }
    }
    if (isLowerCase) {
      for (let i = 0; i < length; i++) {
        lowerPassword += lowerCaseLetters.charAt(
          Math.floor(Math.random() * lowerCaseLetters.length),
        )
      }
    }
    if (isNumbers) {
      for (let i = 0; i < length; i++) {
        numbersPassword += numbers.charAt(
          Math.floor(Math.random() * numbers.length),
        )
      }
    }
    if (isSymbols) {
      for (let i = 0; i < length; i++) {
        symbolsPassword += symbols.charAt(
          Math.floor(Math.random() * symbols.length),
        )
      }
    }

    let combinedPassword = ''
    let shuffledPassword = ''

    if (checkedBoxes) {
      let module = length % checkedBoxes
      let extraLetters = ''

      upperPassword = upperPassword.slice(0, length / checkedBoxes)
      lowerPassword = lowerPassword.slice(0, length / checkedBoxes)
      numbersPassword = numbersPassword.slice(0, length / checkedBoxes)
      symbolsPassword = symbolsPassword.slice(0, length / checkedBoxes)

      combinedPassword =
        upperPassword + lowerPassword + numbersPassword + symbolsPassword

      for (let i = 0; i < module; i++) {
        extraLetters += combinedPassword.charAt(
          Math.floor(Math.random() * length),
        )
      }

      combinedPassword += extraLetters
    }

    shuffledPassword = combinedPassword
      .split('')
      .sort(function () {
        return 0.5 - Math.random()
      })
      .join('')

    setPassword(shuffledPassword)
  }

  return (
    <form
      onSubmit={(e: React.SyntheticEvent) => handleGenerate(e)}
      className="password-generator"
    >
      <div className="range-input">
        <div className="label-box">
          <label htmlFor="range">Character Length</label>
          <span className="password-length">{length}</span>
        </div>
        <input
          type="range"
          name="range"
          id="range"
          value={length}
          onChange={(e) => handleLength(e)}
          min="0"
          max="20"
          step="1"
          ref={passwordRef}
        />
      </div>
      <div className="checkbox-inputs">
        <div className="checkbox-box">
          <input
            onChange={handleUpperCase}
            type="checkbox"
            name="uppercase"
            id="uppercase"
          />
          <label htmlFor="uppercase">Include Uppercase Letters</label>
        </div>
        <div className="checkbox-box">
          <input
            onChange={handleLowerCase}
            type="checkbox"
            name="lowercase"
            id="lowercase"
          />
          <label htmlFor="lowercase">Include Lowercase Letters</label>
        </div>
        <div className="checkbox-box">
          <input
            onChange={handleNumbers}
            type="checkbox"
            name="numbers"
            id="numbers"
          />
          <label htmlFor="numbers">Include Numbers</label>
        </div>
        <div className="checkbox-box">
          <input
            onChange={handleSymbols}
            type="checkbox"
            name="symbols"
            id="symbols"
          />
          <label htmlFor="symbols">Include Symbols</label>
        </div>
      </div>
      <div className="strength-container">
        <h3>Strength</h3>
        <div className="strength-box">
          <p className="strength-name">{passwordStrength}</p>
          <div className="strength-bars">
            <div
              className={
                passwordStrength === 'too-weak'
                  ? 'too-weak bar'
                  : passwordStrength === 'weak'
                  ? 'weak bar'
                  : passwordStrength === 'medium'
                  ? 'medium bar'
                  : passwordStrength === 'strong'
                  ? 'strong bar'
                  : 'bar'
              }
            ></div>
            <div
              className={
                passwordStrength === 'weak'
                  ? 'weak bar'
                  : passwordStrength === 'medium'
                  ? 'medium bar'
                  : passwordStrength === 'strong'
                  ? 'strong bar'
                  : 'bar'
              }
            ></div>
            <div
              className={
                passwordStrength === 'medium'
                  ? 'medium bar'
                  : passwordStrength === 'strong'
                  ? 'strong bar'
                  : 'bar'
              }
            ></div>
            <div
              className={passwordStrength === 'strong' ? 'strong bar' : 'bar'}
            ></div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={
          length < checkedBoxes || passwordStrength === '' || checkedBoxes == 0
            ? 'disabled btn'
            : 'btn'
        }
      >
        Generate <FaArrowRight />
      </button>
    </form>
  )
}

export default PasswordGenerator
