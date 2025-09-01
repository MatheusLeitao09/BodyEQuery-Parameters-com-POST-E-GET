// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import dados from "./src/data/dados.js"
const {bruxos, varinhas, pocoes, animais } = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());        

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});





// Get com filtros
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

// Adicionar o bruxo na minha lista
//é usar o BODY para capturar info
// mudar o nodemon para node no package
// Verbo: POST

// Body Parameters no Node.js - Criar novo bruxo
app.use(express.json()); // Middleware obrigatório!

app.post('/bruxos', (req, res) => {
    // Acessando dados do body
    const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } = req.body;
    
    console.log('Dados recebidos:', req.body);
    
    // Validação básica
    if (!nome || !casa) {
        return res.status(400).json({
            success: false,
            message: "Nome e casa são obrigatórios para um bruxo!"
        });
    }
    
    // Criar novo bruxo
    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa: casa,
        ano: parseInt(ano),
        varinha: varinha,
        mascote: mascote,
        patrono: patrono,
        especialidade: especialidade || "Em desenvolvimento",
        vivo: vivo
    };

    
    // Adicionar à lista de bruxos
    bruxos.push(novoBruxo);
    
    res.status(201).json({
        success: true,
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo
    });
});

// Filtrar por varinhas

app.get('/varinhas', (req, res) => {
    const {material, nucleo} = req.query;
    let varinhasEncontradas = varinhas;

if (material) {
      varinhasEncontradas = varinhasEncontradas.filter(b => b.material.toLowerCase().includes(material.toLowerCase()));
    }

if (nucleo) {
      varinhasEncontradas = varinhasEncontradas.filter(b => b.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
    }
  
res.status(200).json({
total: varinhasEncontradas.length,
data: varinhasEncontradas
})
});


// Filtrar poções

app.get('/pocoes', (req, res) => {
    const {nome, efeito} = req.query;
    let pocoesEncontradas = pocoes;

if (nome) {
      pocoesEncontradas = pocoesEncontradas.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

if (efeito) {
      pocoesEncontradas = pocoesEncontradas.filter(b => b.efeito.toLowerCase().includes(efeito.toLowerCase()));
   
    }

res.status(200).json({
total: pocoesEncontradas.length,
data: pocoesEncontradas
})
});


// Filtrar Animais

app.get('/animais', (req, res) => {
    const {tipo, nome} = req.query;
    let animaisEncontrados = animais;

if (tipo) {
      animaisEncontrados = animaisEncontrados.filter(b => b.tipo.toLowerCase().includes(tipo.toLowerCase()));
    }

if (nome) {
      animaisEncontrados = animaisEncontrados.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
   
    }

res.status(200).json({
total: animaisEncontrados.length,
data: animaisEncontrados
})
});

// Adicionar nova varinha


// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});

// Adicionando uma nova varinha

// Validação básica
    if (!material || !nucleo || !comprimento) {
        return res.status(400).json({
            success: false,
            message: "Material, nucleo e comprimento sao obrigatórios para adicionar uma nova varinha!"
        });
    }

// Criar nova varinha
   const novaVarinha = {
      id: varinhas.length + 1,
      nome,
      material,
      nucleo,
      comprimento
    };

     // Adicionar à lista de varinhas
    varinhas.push(novaVarinha);
    
    res.status(201).json({
        success: true,
        message: "Nova varinha adicionada a Hogwarts!",
        data: novaVarinha
    });