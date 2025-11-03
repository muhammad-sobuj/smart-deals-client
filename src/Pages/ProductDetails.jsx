import React, { use, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const product = useLoaderData() || {};
  const productId = product._id;
  const [bids, setBids] = useState([]);
  const bidModalRef = useRef(null);
  const { user } = use(AuthContext);

  const {
    _id,
    title,
    image,
    category,
    description,
    condition,
    created_at,
    email,
    location,
    price_min,
    price_max,
    seller_image,
    seller_contact,
    seller_name,
    status,
    usage,
  } = product || {};
  // console.log(product);

  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:3000/product/bids/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("bids for this product", data);
          setBids(data);
        });
    }
  }, [productId]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const photo = from.photo.value;
    const bid = from.bid.value;

    console.log({ name, email, photo, bid, _id });
    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: photo,
      bid_price: bid,
      location:location,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your BIDS has been Placed.",
            showConfirmButton: false,
            timer: 1500,
          });

          //add the new bid to the state
          newBid._id=data.insertedId
          const newBids=[...bids,newBid]
          newBids.sort((a,b)=>Number(b.bid_price)-Number(a.bid_price))
          setBids(newBids)
        }
      });
  };

  return (
    <div className="container mx-auto">
      <div className=" flex gap-6 items-center m-auto">
        <div className="">
          <img src={image} alt={title} />
          <p className="text-lg">Product Description</p>
          <div className="">
            <p>Category: {category}</p>
            <p>Usage Time: {usage}</p>
            <hr className="w-full" />
          </div>
          <p>{description}</p>
        </div>

        {/* left side  */}
        <div className="">
          <Link className="text-xs" to="/allProducts">
            ← Back To Products
          </Link>
          <div className="">
            <h2 className="font-bold text-lg">{title}</h2>
            <p>Art and Hobbies</p>
          </div>
          <div className="">
            <p>
              ${price_min}-{price_max}
            </p>
            <p>Price starts From</p>
          </div>
          <div className="">
            <h2 className="font-bold text-lg">Product Details</h2>
            <p>Product ID: {_id}</p>
            <p>Posted: {created_at}</p>
            <p>Condition: {condition}</p>
          </div>
          <div className="">
            <h2 className="font-bold text-lg">Seller Information</h2>
            <div className="flex gap-3">
              <img src={seller_image} alt="image" />
              <p>{seller_name}</p>
              <p>{email}</p>
            </div>
            <p>Location: {location||"Unknown"}</p>
            <p>{seller_contact}</p>
            <p>{status}</p>
          </div>
          <button onClick={handleBidModalOpen} className="btn btn-primary">
            I Want Buy This Product
          </button>

          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give The Best Offer!</h3>
              <p className="py-4">Offer something seller can not Resist</p>

              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  {/* name field */}
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    name="name"
                    readOnly
                    defaultValue={user?.displayName}
                  />
                  {/* photoURL field */}
                  <label className="label">Photo URL</label>
                  <input
                    type="text"
                    className="input"
                    name="photo"
                    defaultValue={user?.photoURL}
                  />
                  {/* email field */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    readOnly
                    defaultValue={user?.email}
                  />

                  {/* Bid Amount field  */}
                  <label className="label">Bids</label>
                  <input
                    type="text"
                    className="input"
                    name="bid"
                    placeholder="Your Bids"
                    required
                  />

                  <button className="btn btn-primary mt-4">
                    Please Your Bids Now
                  </button>
                </fieldset>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <div>
        <h1 className="text-xl">
          Bids For This Products:{" "}
          <span className="text-primary">{bids.length}</span>{" "}
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr key={bid._id || index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={bid.buyer_image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">{bid.location}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                   {bid.buyer_email}
                  </td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
