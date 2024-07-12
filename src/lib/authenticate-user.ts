import { getServerSession } from "next-auth";

import { authOptions } from "./auth-option";
import prisma from "./prisma";

export const authenticateUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const sessionUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!sessionUser) {
    return null;
  }

  return sessionUser;
};
