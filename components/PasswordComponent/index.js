import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Input from "../Common/Form/Input";
import axios from "axios";
import Spinner from "../Loader/Spinner";

const PasswordComponent = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [recovery, setRecovery] = useState(router.query.recovery === "true");
  const [loading, setLoading] = useState({
    show: false,
    message: "",
  });

  const changePassword = async () => {
    console.log(router.query);
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading({
      show: true,
      message: "Changing Password...",
    });
    axios
      .post("/api/faculty/change_password", {
        oldPassword,
        newPassword,
        recovery,
        faculty_id: router.query.faculty_id,
      })
      .then((res) => {
        console.log("Password Changed Successfully", res.data);
        console.log("data is", res.data?.notMatch);
        if (res.data?.notMatch) {
          setLoading({
            show: false,
            message: "",
          });
          alert("Old Password does not match");
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log("Error in change_password", err);
        setLoading({
          show: false,
          message: "",
        });
      });
    // axios to change password
  };

  useEffect(() => {
    if (router.isReady) {
      setRecovery(router.query.recovery === "true");
      setName(router.query.name);
    }
  }, [router]);

  return (
    <div>
      <Spinner show={loading.show} message={loading.message} />
      <h1 className="text-2xl font-medium text-center">
        {recovery ? <>Set a new password for {name}</> : "Change your password"}
      </h1>
      <div className="grid grid-cols-1">
        {!recovery && (
          <Input
            text="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        )}

        <Input
          text="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <Input
          text="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex mt-10">
        <button
          onClick={changePassword}
          className="bg-blue-800 hover:bg-blue-700 text-lg font-poppins text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline "
        >
          {recovery ? "Reset Password" : "Change Password"}
        </button>
      </div>
    </div>
  );
};

export default PasswordComponent;