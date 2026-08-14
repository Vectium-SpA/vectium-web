import emailjs from '@emailjs/browser';

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

export const sendContactEmail = async (data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}) => {
  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        from_name: data.name,
        from_email: data.email,
        company: data.company || 'No especificada',
        phone: data.phone || 'No especificado',
        message: data.message,
        to_email: 'contacto@vectium.cl',
      },
      EMAILJS_CONFIG.publicKey
    );
    return { success: true, result };
  } catch (error) {
    console.error('Error enviando email:', error);
    return { success: false, error };
  }
};

/**
 * Suscripcion al newsletter del footer.
 *
 * Reutiliza la MISMA plantilla de EmailJS que el formulario de contacto, asi
 * que no necesita variables de entorno nuevas: llega como aviso a
 * contacto@vectium.cl.
 *
 * No hay lista de correos ni envio masivo todavia, y es a proposito: antes de
 * mandar cualquier campana hay que cumplir el art. 28 B de la Ley 19.496
 * (identificar al remitente y ofrecer la baja en cada correo publicitario).
 * Por ahora esto solo avisa que alguien pidio que lo contacten.
 *
 * Antes era un <form> con onSubmit={(e) => e.preventDefault()}: pedia el correo
 * y no hacia absolutamente nada con el.
 */
export const subscribeNewsletter = async (email: string) => {
  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        from_name: 'Suscripcion al newsletter',
        from_email: email,
        company: 'No especificada',
        phone: 'No especificado',
        message:
          `Nueva suscripcion al newsletter desde el footer del sitio.\n\n` +
          `Correo: ${email}\n\n` +
          `Recordatorio: antes de enviarle comunicacion comercial, el correo ` +
          `debe identificar al remitente y ofrecer la baja (Ley 19.496 art. 28 B).`,
        to_email: 'contacto@vectium.cl',
      },
      EMAILJS_CONFIG.publicKey
    );
    return { success: true, result };
  } catch (error) {
    console.error('Error suscribiendo al newsletter:', error);
    return { success: false, error };
  }
};
