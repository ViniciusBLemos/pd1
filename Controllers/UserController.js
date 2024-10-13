const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo usuário
exports.createUser = async (req, res) => {
    const { name, email, password, cpf, numero, departamento, dataNascimento, role, id_empresa } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                cpf,
                numero,
                departamento,
                dataNascimento: new Date(dataNascimento),
                role,
                id_empresa,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Usuário', details: error.message });
    }
};

// Obter um usuário por ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            include: { empresa: true, enderecos: true, logs: true, gaming: true, tasks: true, carreira: true, habilidades: true },
        });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Usuário', details: error.message });
    }
};

// Atualizar um usuário
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, cpf, numero, departamento, dataNascimento, role, id_empresa } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                password,
                cpf,
                numero,
                departamento,
                dataNascimento: new Date(dataNascimento),
                role,
                id_empresa,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Usuário', details: error.message });
    }
};

// Deletar um usuário
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Usuário', details: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};
