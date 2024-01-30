type props ={
    formAction?:string | undefined
    className:string;
    href?:string;
    onClick?:() => void;
    children:React.ReactNode;
}

const Button = ({formAction ,children, className,onClick}: props) => {
  return (
    <button formAction={formAction} className={className} onClick={onClick}>{children}</button>
  )
}

export default Button

