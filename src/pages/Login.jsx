import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      login(data);

      if (data.role === "admin") {
        toast.success("Login berhasil!")
        navigate("/admin");
      } else {
        toast.success("Login berhasil!")
        navigate("/");
      }
    } catch (err) {
      toast.error("Email atau password tidak sesuai")
    }
  };

  return (
    <>
      <div className="max-w-screen min-h-screen flex justify-center items-center bg-lightbg">
        <div className="bg-white rounded-lg shadow-xl py-3">
          <form
            onSubmit={handleSubmit}
            className="p-4 flex flex-col gap-4 h-80 w-90 justify-center font-content"
          >
          <h1 className="text-center text-2xl font-logo pb-8">Login</h1>
            <input
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2"
            />

            <input
              type="password"
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2"
            />

            <button
              type="submit"
              className="bg-veg-200 rounded-md p-2 hover:bg-veg-400 duration-200"
            >
              Login
            </button>
          </form>
          <div className="flex justify-between">
            <Link to={"/"} className="p-4 font-content text-sm hover:text-gray-600 duration-150">
              Kembali
            </Link>
            <Link to={"/register"} className="p-4 font-content text-sm hover:text-gray-600 duration-150">
              Belum punya akun?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
