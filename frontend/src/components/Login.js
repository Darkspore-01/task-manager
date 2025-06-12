function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios.post("http://localhost:5000/login", { username, password })
      .then(res => localStorage.setItem("token", res.data.token));
  };

  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}