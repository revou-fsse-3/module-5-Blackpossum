import { useEffect,useState } from "react";

type props = {
    status: string;
}

const useStatus = ({status}: props) => {
    const [statusLabel,setStatusLabel]= useState<string>("");
    const handleChangeSatus = () => {
        if(status === "aproved"){
            setStatusLabel("Loged In")
        } else {
            setStatusLabel("user Not Logged In")
        }
    };

    useEffect(()=>{
        handleChangeSatus();
    },[status])


    return(
        { statusLabel }
    )
};

export default useStatus;