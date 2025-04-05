import { defineAction } from 'astro:actions';

export const server = {
  send: defineAction({
    accept: 'form',
    handler: async ({ formData }) => {
      return { success: true, message: 'Action received!' };
    },
  }),
};
