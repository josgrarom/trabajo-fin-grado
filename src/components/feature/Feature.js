import React from 'react'

function Feature(props){
  return (
    <div className='featureContainer'>
      <img
        className='featureImg'
        src={require(`/src/images/feature/${props.image}`)}
        alt=''
      />
      
      <div className='featureText'>
        <p className='featureName'>{props.name}</p>
        <p className='featureDescription'>{props.description}</p>
      </div>
    </div>
  )
}

export default Feature;