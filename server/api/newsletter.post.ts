import { prisma } from '../utils/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const email = body?.email?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' });
  }

  const existing = await prisma.subscriber.findUnique({ where: { email } });

  if (existing) {
    return { success: false, message: 'already_subscribed' };
  }

  await prisma.subscriber.create({ data: { email } });

  return { success: true, message: 'subscribed' };
});
