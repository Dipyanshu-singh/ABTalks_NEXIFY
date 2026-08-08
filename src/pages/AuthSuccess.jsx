import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthSuccess Loaded");

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("Token =", token);

    if (token) {
      localStorage.setItem("token", token);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }, [navigate]);
  

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "28px",
        fontWeight: "bold",
      }}
    >
      Logging you in...
    </div>
  );
};

export default AuthSuccess;