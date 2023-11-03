import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const params = useParams();
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `http://localhost:4000/services/${params.id}`
      );
      setData(res.data);
    };
    getData();
  }, [params.id]);
  
  

  const handleFormData = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const date = e.target.date.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const text_field = e.target.text_field.value;
    const order = {
      first_name: name,
      date,
      email,
      phone,
      image:data?.img,
      description: text_field,
    };
    console.log(order);
    fetch("http://localhost:4000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert('successfully Submitted')
      });
  };
  console.log(data);
  return (
    <div>
      <p>Data:{data.title}</p>
      <form onSubmit={handleFormData} className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Booking Date</span>
            </label>
            <input
              type="date"
              name="date"
              placeholder="Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              placeholder="Your Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input
              type="phone"
              name="phone"
              placeholder="Your Phone"
              className="input input-bordered"
              required
            />
          </div>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Your Massage</span>
          </label>
          <textarea
            className="textarea textarea-success w-full"
            name="text_field"
            placeholder="Product Description"
          ></textarea>
        </div>
        <div className="form-control mt-6">
          {/* <button className="btn btn-block">block</button> */}
          <input
            className="btn btn-primary btn-block"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    
     
    </div>
  );
};

export default Checkout;
