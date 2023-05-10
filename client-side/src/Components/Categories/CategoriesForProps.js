import React from 'react'

const CategoriesForProps = (props) => {
  return (
    <div
    className='CategoriesForProps'
    style={{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'centre',
        gap:'0.7em',
        marginLeft:'1em',
        
    }}>
        <span>
            {props.icon}
        </span>
        <h6>{props.name}</h6>
        </div>
  )
}

export default CategoriesForProps