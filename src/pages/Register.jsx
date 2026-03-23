import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await registerUser(form);

      toast.success("Register berhasil!");
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Register gagal";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
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
            <h1 className="text-center text-2xl font-logo pb-8">Register</h1>

            <input
              type="text"
              name="nama"
              placeholder="Nama"
              value={form.nama}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-veg-200 rounded-md p-2 hover:bg-veg-400 duration-200"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
          <div className="flex justify-between">
            <Link
              to={"/"}
              className="p-4 font-content text-sm hover:text-gray-600 duration-150"
            >
              Kembali
            </Link>
            <Link
              to={"/login"}
              className="p-4 font-content text-sm hover:text-gray-600 duration-150"
            >
              Sudah punya akun?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
