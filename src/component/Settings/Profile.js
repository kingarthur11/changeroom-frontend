import React from "react";
import styled from "styled-components";

const Profile = () => {
  return (
    <Wrapper>
      <div className="w-100">
        <div className="w-50">
          <form>
            <div className="my-2">
              <div className="">
                <label>Full Name</label>
                <input
                  name="password"
                  defaultValue="password"
                  className="w-100 dollar-input"
                  type="password"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="my-2">
                  <div className="">
                    <label>Email</label>
                    <input
                      name="password"
                      defaultValue="password"
                      className="w-100 dollar-input"
                      type="password"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="my-2">
                  <div className="">
                    <label>Phone Number</label>
                    <input
                      name="password"
                      defaultValue="password"
                      className="w-100 dollar-input"
                      type="password"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-2">
              <div className="">
                <label>Country</label>
                <input
                  name="password"
                  defaultValue="password"
                  className="w-100 dollar-input"
                  type="password"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-50"></div>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  /* width: 100%; */
  padding: 1rem 10rem;
`;
