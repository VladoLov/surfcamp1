"use client";

import { useState } from "react";
import axios from "axios";

function SubscribeToNewsletter() {
  const [email, setEmail] = useState("");
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showError, setShowError] = useState(false);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.length) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/newsletter-signups`,
          {
            data: {
              email,
            },
          }
        );
      }
      setHasSignedUp(true);
      //give back feedback to user that they signed up
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  };
  return (
    <section className="newsletter">
      {showError ? (
        <h4 className="newsletter__thanks">Could not sign up for newsletter</h4>
      ) : hasSignedUp ? (
        <h4 className="newsletter__thanks">
          Thank you for signing up for newsletter!
        </h4>
      ) : (
        <>
          <div className="newsletter__info">
            <h4>subscribe to our newsletter</h4>
            <p className="copy">
              Unlock Exclusive Insights and Stay In the Know – Subscribe to Our
              Newsletter Today to always stay in touch
            </p>
          </div>

          <form className="newsletter__form" onSubmit={onSubmit}>
            <input
              type="text"
              className="newsletter__email input"
              placeholder="Enter your E-mail address"
              value={email}
              onChange={onChange}
            />
            <button
              type="submit"
              className="newsletter__subscribes btn btn--turquoise btn--medium"
            >
              Subscribe
            </button>
          </form>
        </>
      )}
    </section>
  );
}

export default SubscribeToNewsletter;
