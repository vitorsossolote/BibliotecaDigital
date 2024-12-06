const admin = require('firebase-admin');
const moment = require('moment');
const connection = require('../database/connection');

class NotificationService {
  static async verificarEmprestimosProximoVencimento() {
    try {
      const query = `
        SELECT 
          emprestimos.emprestimo_id, 
          emprestimos.data_devolucao, 
          livros.titulo AS livro_titulo, 
          students.fcm_token
        FROM emprestimos
        JOIN livros ON emprestimos.livro_id = livros.id
        JOIN students ON emprestimos.user_rm = students.rm
        WHERE 
          emprestimos.estado = 'ativo' AND 
          students.fcm_token IS NOT NULL AND 
          DATEDIFF(emprestimos.data_devolucao, CURDATE()) BETWEEN 1 AND 3
      `;

      const [emprestimos] = await connection.query(query);

      for (const emprestimo of emprestimos) {
        const diasRestantes = moment(emprestimo.data_devolucao).diff(moment(), 'days');
        
        const message = {
          notification: {
            title: 'Devolução Próxima',
            body: `O livro "${emprestimo.livro_titulo}" vence em ${diasRestantes} dia(s)`
          },
          token: emprestimo.fcm_token
        };

        try {
          await admin.messaging().send(message);
          console.log(`Notificação enviada para empréstimo ${emprestimo.emprestimo_id}`);
        } catch (error) {
          console.error('Erro ao enviar notificação:', error);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar empréstimos:', error);
    }
  }
}

module.exports = NotificationService;