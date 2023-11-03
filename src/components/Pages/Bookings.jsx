import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Reservation from "./Reservation";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookingData, setBookingData] = useState([]);
  const axiosSecure = UseAxiosSecure()
  useEffect(() => {
    const getData = async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${user?.email}`,{withCredentials:true}
      );
      setBookingData(res.data);
    };
    getData();
  }, [user?.email,axiosSecure]);
  console.log(bookingData);

  const handleDelete = (id) => {
    const proceed = confirm("Are You sure you want to delete");
    if (proceed) {
      fetch(`http://localhost:4000/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("deleted successful");
            const remaining = bookingData.filter(
              (booking) => booking._id !== id
            );
            setBookingData(remaining);
          }
        });
    }
  };

  const handleBookingConfirm = (id) => {
    fetch(`http://localhost:4000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          // update state
          const remaining = bookingData.filter((booking) => booking._id !== id);
          const updated = bookingData.find((booking) => booking._id === id);
          updated.status = "confirm";
          const newBookings = [updated, ...remaining];
          setBookingData(newBookings);
        }
      });
  };

  return (
    <div>
      <h2 className="text-5xl">Your bookings: {bookingData.length}</h2>
      <div className="overflow-x-auto w-full ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>First Name</th>
              <th>Date</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              // bookingData.map(booking => <Reservation
              //     key={booking._id}
              //     booking={booking}
              //     handleDelete={handleDelete}
              //     handleBookingConfirm={handleBookingConfirm}
              // ></Reservation>)
              bookingData.map((booking) => (
                <Reservation
                  key={booking._id}
                  booking={booking}
                  handleDelete={handleDelete}
                  handleBookingConfirm={handleBookingConfirm}
                ></Reservation>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
