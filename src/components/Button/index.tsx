import { pipe, join } from '@fxts/core'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = (props) => {
  return (
    <button
      className={pipe(
        [
          'block',
          'w-full',
          'rounded-lg',
          'p-2',
          'disabled:opacity-50',
          'disabled:bg-gray-500',
          'disabled:cursor-not-allowed',
          props.className || '',
        ],
        join(' ')
      )}
      type="button"
      onClick={props.onClick}
      value={props.value}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
