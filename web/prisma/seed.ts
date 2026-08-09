import { PrismaClient, AdminRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "sales@fremcoltd.com";
  const password = process.env.ADMIN_PASSWORD ?? "changeme-admin";
  const name = process.env.ADMIN_NAME ?? "FREEM Admin";

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name, role: AdminRole.ADMIN },
    create: {
      email,
      passwordHash,
      name,
      role: AdminRole.ADMIN,
    },
  });

  const categories = [
    { slug: "sugar", name: "Sugar", sortOrder: 1 },
    { slug: "rice", name: "Rice", sortOrder: 2 },
    { slug: "fertilizers", name: "Fertilizers", sortOrder: 3 },
    { slug: "edible-cooking-oil", name: "Edible Cooking Oil", sortOrder: 4 },
    { slug: "energy-drinks", name: "Energy Drinks", sortOrder: 5 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, sortOrder: category.sortOrder },
      create: category,
    });
  }

  console.log(`Seeded admin user: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
