import React from 'react'
import { useParams } from 'react-router-dom';

const IPO = () => {
  const { id } = useParams(); 
  return (
    <div>
     IPO {id}
    </div>
  )
}

export default IPO;
