const express = require('express');
const app = express();
const userRoutes = require('./Routes/userRoutes');

app.use(express.json()); // Middleware para interpretar JSON
app.use('/api', userRoutes); // Rota base

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
