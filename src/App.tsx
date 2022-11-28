import { useState } from 'react'
import PasswordGenerator from './components/PasswordGenerator'
import PasswordOutput from './components/PasswordOutput'

const App:React.FC = () => {

  const [password,setPassword] = useState<string>('')

  return (
    <div className="wrapper">
      <h1>Password Generator</h1>
      <PasswordOutput password={password} />
      <PasswordGenerator setPassword={setPassword} />
    </div>
  )
}

export default App
