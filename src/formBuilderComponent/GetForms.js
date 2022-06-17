import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function Getforms() {
    const [utilisateur, setUtilisateur] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:5000/form').then((res) => {
        setUtilisateur(res.data);
      });
    }, []);
  return (
    <div>
        { utilisateur.map((val, key) => ( 
            <div key={key}>
    <div>{val.name}</div></div>
        ))}
    </div>
  )
}

export default Getforms