import { useLocation, useNavigate } from "react-router-dom";
import sampleimage from "../images/Illustration.png";
import { useSelector } from "react-redux";

const SuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");

  const user = useSelector((state) => state.auth.userData.firstname);

  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "11em",
      }}
    >
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Dear {""} {user} your {""}
        {message}
      </h2>

      <p
        style={{
          marginTop: "0.5em",
          textAlign: "center",
        }}
      >
        {message}
      </p>
      {/* Add any additional content or messages */}
      <img
        style={{
          width: "150px",
          marginTop: "5em",
        }}
        src={sampleimage}
        alt="sample"
      />
      <button
        style={{
          marginTop: "5em",
          backgroundColor: "#064bde",
          border: "none",
          width: "23em",
          height: "3.4em",
          borderRadius: "0.4em",
          color: "white",
        }}
        onClick={() => navigate("/sellersproductsdisplay")}
      >
        Back to Products
      </button>
    </div>
  );
};

export default SuccessPage;
