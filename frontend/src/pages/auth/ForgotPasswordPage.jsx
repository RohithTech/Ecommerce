import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../api/axios.js";
import updatealert from '../../components/alert/update.js'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({Password:"",confirmPassword:""});
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      // Pass email as a query parameter
      const response = await api.get("/user", { params: { email } });

      if (response.data.success) {
        setOtpSent(true);

        try {
          const otp = await api.post('/auth/otp',{email})
        } catch (error) {
          console.log(error);   
        }
      }
    } catch (error) { 
      setError({email:error.response.data.message});
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    const condition =password.Password !== password.confirmPassword || password.Password.length !== 6 || password.confirmPassword.length !== 6;
      if(condition){
        setError((prev)=>({
            ...prev,
            passlen:"Must be password in 6 characters",
            Password:"New password and confirm password are not same"
        }))
      }
    else{
      try {
      const update =  await api.patch("/login", {
          email,
          otp,
          password:password.confirmPassword,
        });
        if(update.data.success){
          setSuccess(true);
  
          updatealert();
          setTimeout(()=>{
            navigate('/login')
          },2000)
        }
      } catch (error) {
        console.log(error.response);   
        setError((prev)=>(
          {
            ...prev,
            otp:error.response.data.error
          }
        ))}
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Reset Password</h1>

      <p className="mt-1 text-sm text-slate-500">
        Enter your email and verify with OTP
      </p>

      {success ? (
        <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Password updated successfully. You can now sign in with your new
          password.
        </div>
      ) : !otpSent ? (
        <form onSubmit={sendOtp} className="mt-6 space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Send OTP
          </Button>
          {error.email &&
            <p className="p-1 text-sm flex justify-center items-center text-center text-rose-600 dark:bg-rose-950">
              Email does not exist</p>}
        </form>
      ) : (
        <form onSubmit={resetPassword} className="mt-6 space-y-4">
          <div className="rounded-xl bg-indigo-50 p-3 text-sm text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            OTP sent to <strong>{email}</strong>
          </div>

          <Input
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <Input
            label="New Password"
            type="password"
            value={password.Password}
            onChange={(e) => setPassword((prev)=>({...prev,Password:e.target.value}))}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            value={password.confirmPassword}
            onChange={(e) => setPassword((prev)=>({...prev,confirmPassword:e.target.value}))}
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Verify OTP & Reset Password
          </Button>
          {error.Password && <p className="p-1 text-sm flex justify-center items-center text-center text-rose-600 dark:bg-rose-950">{error.Password}</p>}
          {error.passlen && <p className="p-1 text-sm flex justify-center items-center text-center text-rose-600 dark:bg-rose-950"> {error.passlen}</p> }
        {error.otp && <p className="p-1 text-sm flex justify-center items-center text-center text-rose-600 dark:bg-rose-950"> {error.otp}</p>}
        </form>
      )}

      {/* <p className="mt-6 text-center text-sm text-slate-500">
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Back to Sign In
        </Link>
      </p> */}
    </>
  );
}
