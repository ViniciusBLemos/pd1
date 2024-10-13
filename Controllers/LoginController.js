const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'seuSegredoAqui'; // Defina uma chave secreta segura

// Função para fazer login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifique se o usuário existe
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Comparar a senha fornecida com o hash armazenado no banco
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        // Gerar um token JWT
        const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, {
            expiresIn: '1h', // Token válido por 1 hora
        });

        // Retornar o token e as informações do usuário
        return res.json({
            message: 'Login bem-sucedido',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};

module.exports = { login };
