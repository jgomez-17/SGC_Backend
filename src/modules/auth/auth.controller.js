const userPredeterminado = {
  id: 1,
  nombre: "user",
  email: "fyasocialcapital@gmail.com",
  password: "12345", 
};


const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  if (email === userPredeterminado.email && password === userPredeterminado.password) {
    return res.json({
      message: "Login exitoso",
      user: {
        id: userPredeterminado.id,
        nombre: userPredeterminado.nombre,
        email: userPredeterminado.email,
      },
      token: "dummy-token", 
    });
  }

  return res.status(401).json({ message: "Credenciales incorrectas" });
};

module.exports = {
  login,
};