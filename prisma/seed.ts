import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const zamfaraLgas = [
  "Anka",
  "Bakura",
  "Birnin Magaji/Kiyaw",
  "Bukkuyum",
  "Bungudu",
  "Gummi",
  "Gusau",
  "Kaura Namoda",
  "Maradun",
  "Maru",
  "Shinkafi",
  "Talata Mafara",
  "Tsafe",
  "Zurmi"
];

async function main() {
  for (const name of zamfaraLgas) {
    const code = name.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "");
    await prisma.lga.upsert({
      where: { name },
      update: { code },
      create: { name, code }
    });
  }
  console.log(`Seeded ${zamfaraLgas.length} Zamfara LGAs.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
