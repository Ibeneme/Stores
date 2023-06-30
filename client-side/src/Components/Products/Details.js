import React from 'react'
import { useParams } from 'react-router'


const Details = () => {
    const { id:productId} = useParams()

    
  return (
    <div>
        <a href={`/products/${product.id}`}>
            <img src={product.name} />

        </a>
    </div>
  )
}

export default Details