import React from 'react'

function FeaturedProduct() {
  return (
    <div>
        <div className=''>
            <h2>{ type } products</h2>
        </div>  
        <div>
            {data.map(item => (
                <Card />
            ))}
        </div>
    </div>
  )
}

export default FeaturedProduct