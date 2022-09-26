import React from 'react'
const mystyle={
    backgroundColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
    color:'white',
    padding:'25px',
    textAlign:'center',
    fontFamily: 'cursive',
    margin:'0'
    
}
const span={
    color:'red'
}

const Footer = (props) => {
  return (
    <div>
        <h4   className='fixed-bottom' style={mystyle}>Created by <span style={span}><i class="fa fa-heart" aria-hidden="true"></i></span> Sukraj Chaudhary</h4>
    </div>
  )
}

export default Footer