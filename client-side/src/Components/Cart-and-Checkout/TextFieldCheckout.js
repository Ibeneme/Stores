import React from 'react'
import { ErrorMessage, useField } from 'formik'
import './Checkout.css'


const TextFieldCheckout = ({label, ...props}) => {
   const [ field ] = useField(props)
  return (
    <div>
      <div style={{
        display:'flex',
        flexDirection:'column'
      }}>
         <label htmlFor={field.name}>{label}</label>
        <input 
        className='input-forms-checkout'
        {...field} {...props}
        placeholder={label}
       autoComplete='off'
       
       required />
      </div>
       
       <div
          style={{
            color:'red'
        }}>
          <p>
          <ErrorMessage
        name ={field.name}
         />


          </p>
       </div>
       
    </div>
  )
}

export default TextFieldCheckout


