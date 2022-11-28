import React, { useRef, useState } from 'react'
import { FaCopy } from 'react-icons/fa'

interface Props {
  password: string
}

const PasswordOutput = ({ password }: Props) => {
  let passwordRef = useRef<HTMLInputElement | null>(null)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleCopy = () => {
    passwordRef?.current?.select()
    if (password.length > 0) {
      if (passwordRef.current !== null) {
        navigator.clipboard.writeText(passwordRef.current.value)
        setIsCopied(true)
      }
      setTimeout(() => {
        setIsCopied(false)
      }, 2000);
    }
  }

  return (
    <div className="password-output">
      <input
        type="text"
        value={password}
        placeholder="rG@ew23!s"
        className="password"
        ref={passwordRef}
      />
      {isCopied ? 'COPIED' : ''}
      <FaCopy onClick={handleCopy} />
    </div>
  )
}

export default PasswordOutput
