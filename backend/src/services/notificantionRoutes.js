const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.post('/send-test-notification', async (req, res) => {
  try {
    const { fcmToken, title, body } = req.body;

    const message = {
      notification: { title, body },
      token: fcmToken
    };

    const response = await admin.messaging().send(message);
    
    res.json({ 
      success: true, 
      messageId: response,
      message: 'Notificação de teste enviada com sucesso' 
    });
  } catch (error) {
    console.error('Erro no envio de notificação:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;