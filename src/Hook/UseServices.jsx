import { useEffect, useState } from "react";


const UseServices = () => {
    const [services, setServices] = useState([]);
   useEffect(() => {
    fetch('http://localhost:4000/services')
    .then(res => res.json())
    .then (data => setServices(data))
   },[])
   return services;
};

export default UseServices;