import './Button.scss'


type ButtonProps = {
    text: string,
    type?: 'POSITIVE' | 'NEGATIVE' | 'default',
    onClick: () => void,
}

const Button = ({text, type = 'default', onClick}:ButtonProps) => {
  return (
    <button className={`Button Button_${type}`} onClick={onClick}>{text}</button>
  )
}

export default Button