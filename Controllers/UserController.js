const prisma = require('@prisma/client').PrismaClient;
const bcrypt = require('bcryptjs');
const prismaClient = new prisma();

// Criação de novo usuário
async function createUser(req, res) {
    const { name, email, password, cpf, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedCPF = await bcrypt.hash(cpf, salt); // Criptografando o CPF

    try {
        const newUser = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                cpf: hashedCPF,
                role: role || 'USER', // Nível de acesso padrão: USER
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Listar usuários
async function getUsers(req, res) {
    try {
        const users = await prismaClient.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Buscar usuário por ID
async function getUserById(req, res) {
    const { id } = req.params;

    try {
        const user = await prismaClient.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Atualizar usuário
async function updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password, cpf, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = password ? await bcrypt.hash(password, salt) : undefined;
    const hashedCPF = cpf ? await bcrypt.hash(cpf, salt) : undefined;

    try {
        const updatedUser = await prismaClient.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                password: hashedPassword,
                cpf: hashedCPF,
                role,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Deletar usuário
async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        await prismaClient.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
