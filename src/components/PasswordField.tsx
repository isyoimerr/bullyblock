import { Eye, EyeOff } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'

type PasswordFieldProps = {
  id: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  required?: boolean
  placeholder?: string
  className?: string
}

export default function PasswordField({
  id,
  value,
  onChange,
  autoComplete,
  required,
  placeholder,
  className = 'input',
}: PasswordFieldProps) {
  const [mostrar, setMostrar] = useState(false)

  return (
    <div className="password-field">
      <input
        id={id}
        className={className}
        type={mostrar ? 'text' : 'password'}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="password-toggle"
        aria-label={mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        aria-pressed={mostrar}
        onClick={() => setMostrar((prev) => !prev)}
      >
        {mostrar ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
      </button>
    </div>
  )
}
