import React, { useState, useEffect } from "react";
import PageRoutes from "./ApiRoute";
import { useSelector, useDispatch } from "react-redux";
import { RefreshUser } from "./redux/actions/authActions";
import Spinner from "./component/common/loading";
import Hamburger from "./Hamburger";

function App() {
  const dispatch = useDispatch();
  const { login, isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(RefreshUser());
  }, [RefreshUser]);

  return (
    <div className="">
      {/* <Hamburger /> */}
      {isAuth !== null ? (
        <PageRoutes isAuth={isAuth} />
      ) : (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default App;
