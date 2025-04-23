require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // importa o pool de conexões

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 🟢 Rota de boas-vindas (resolve o "Cannot GET /")
app.get("/", (req, res) => {
  res.send("🚀 Backend do Projeto Arrais está no ar, meu consagrado!");
});

// 🔍 Rota para buscar aquisições
app.get("/aquisicoes", (req, res) => {
  const query = `
    SELECT  
        T1.CD_AQUISICAO, 
        T1.NM_COR, 
        CONCAT(SUBSTRING(T1.NM_ANO, 1, 4), '-', SUBSTRING(T1.NM_ANO, 5, 4)) AS NM_ANO,  
        T1.TP_COMBUSTIVEL, 
        T1.TP_KFMETADE, 
        T4.NM_SIGLA, 
        T3.NM_TRANSACAO, 
        T1.VL_PEDIDO, 
        T1.NM_KILOMETRO, 
        T1.NR_PLACA, 
        T2.NM_MODELO, 
        T1.TP_ESTOQUE, 
        T1.TP_SITUACAO, 
        T1.TP_BLINDADO 
    FROM AQUISICAO T1
    LEFT JOIN VEICULO T2 ON T1.CD_MODELO = T2.CD_VEICULO
    LEFT JOIN TRANSACAO T3 ON T1.CD_TRANSACAO = T3.CD_TRANSACAO
    LEFT JOIN LOCAL T4 ON T1.CD_LOCAL = T4.CD_LOCAL
    WHERE T1.TP_SITUACAO IN (1, 7, 8) 
    ORDER BY T2.NM_MODELO;
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("❌ Erro ao buscar dados:", err);
      return res.status(500).json({ error: "Erro ao buscar dados" });
    }
    res.json(results);
  });
});

// 🚀 Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
