type props = {
    href:string;
    target:string;
    className:string;
    children:React.ReactNode
}

const NavigateTo = ({href,target,className,children}:props) => {
  return (
    <a href={href} target={target} className={className}>{children}</a>
  )
}

export default NavigateTo