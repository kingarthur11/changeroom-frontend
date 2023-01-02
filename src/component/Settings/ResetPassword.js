import React from "react";
import styled from "styled-components";

const ResetPassword = () => {
  return (
    <Wrapper>
      <div className="w-100">
        <div className="w-50">
          <h3>Change Password</h3>
          <div className="my-2">
            <div className="">
              <label>Comfirm Password</label>
              <input
                name="password"
                defaultValue="password"
                className="w-100 dollar-input"
                type="password"
              />
            </div>
          </div>
          <div className="my-2">
            <div className="">
              <label>Comfirm Password</label>
              <input
                name="password"
                defaultValue="password"
                className="w-100 dollar-input"
                type="password"
              />
            </div>
          </div>
          <div className="my-2">
            <div className="">
              <label>Comfirm Password</label>
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
      <div className="w-50"></div>
    </Wrapper>
  );
};

export default ResetPassword;

const Wrapper = styled.div`
  padding: 1rem 10rem;
`;
