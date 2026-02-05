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
