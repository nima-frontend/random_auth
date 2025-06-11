'use client'

type PhoneProps = {
    value:string;
    onChange:(val:string)=> void
}

export default function PhoneInput({value,onChange}:PhoneProps){
    return(
        <input 
        id="phone"
        type="tel"
        value={value}
        onChange={(e)=>onChange(e.target.value)}       
        required
        />

    )

}