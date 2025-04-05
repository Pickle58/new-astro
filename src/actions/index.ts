import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: 'form',
    handler: async ({ formData }) => {
      const email = formData.get('email') as string;
      const subject = formData.get('subject') as string;
      const message = formData.get('message') as string;

      if (!email || !subject || !message) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Please fill in all fields.',
        });
      }

      const { error } = await resend.emails.send({
        from: 'James <jpilkington332@gmail.com>',
        to: ['delivered@resend.dev'],
        subject: subject,
        html: `<p>From: ${email}</p><p>${message}</p>`,
      });

      if (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      }

      return { success: true, message: 'Email sent successfully!' };
    },
  }),
};
