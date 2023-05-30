import React from 'react'
import { ErrorMessage, useField } from 'formik'
import '../auth.css'

const TextField = ({label, ...props}) => {
   const [ field ] = useField(props)
   const emptyOnChange = () => {};
  return (
    <div>
      <div style={{
        display:'flex',
        flexDirection:'column'
      }}>
         <label htmlFor={field.name}>{label}</label>
        
        <input 
        onChange={emptyOnChange} 
        style={{ touchAction: 'manipulation',
      fontSize:'1em' }}
        className='input-forms'
        {...field} {...props}
        placeholder={label}
       autoComplete='off'
       
        />
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

export default TextField