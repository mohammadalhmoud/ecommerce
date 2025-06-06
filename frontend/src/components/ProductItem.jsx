import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

function ProductItem({id,name,price,image}) {
 const {currency} = useContext(ShopContext)
    return (
  <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
    <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out w-[250px] h-[250px] object-cover' src={image[0]} alt='' />

    </div>
    <p className='pt-3 pb-1 text-sm truncate'>{name}</p>
    <p className='text-sm font-medium'>{currency}{price}</p>
  
  </Link>
  )
}
export default ProductItem
