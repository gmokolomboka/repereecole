import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const tenant = await prisma.tenant.upsert({
    where: { slug: "demo" },
    update: {},
    create: {
      name: "Demo School",
      slug: "demo",
      status: "ACTIVE",
    },
  });

  const school = await prisma.school.upsert({
    where: { id: "school-1" },
    update: {},
    create: {
      id: "school-1",
      tenantId: tenant.id,
      name: "École Primaire Repère",
      code: "EP001",
      address: "123 Rue de l'École",
      city: "Paris",
      phone: "01 23 45 67 89",
      email: "contact@ecolerepere.fr",
      timezone: "Europe/Paris",
      status: "ACTIVE",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "admin@ecolerepere.fr" },
    update: {},
    create: {
      tenantId: tenant.id,
      firstName: "Admin",
      lastName: "User",
      email: "admin@ecolerepere.fr",
      status: "ACTIVE",
    },
  });

  const classe = await prisma.class.upsert({
    where: { id: "class-1" },
    update: {},
    create: {
      id: "class-1",
      schoolId: school.id,
      name: "CM1",
      level: "CM1",
      academicYear: "2024-2025",
    },
  });

  const students = [
    { studentNumber: "S001", firstName: "Lucas", lastName: "Martin", class: "CM1" },
    { studentNumber: "S002", firstName: "Sophie", lastName: "Durand", class: "CM1" },
    { studentNumber: "S003", firstName: "Thomas", lastName: "Bernard", class: "CM1" },
    { studentNumber: "S004", firstName: "Emma", lastName: "Rousseau", class: "CM1" },
    { studentNumber: "S005", firstName: "Pierre", lastName: "Leclerc", class: "CM1" },
    { studentNumber: "S006", firstName: "Julie", lastName: "Moreau", class: "CM1" },
    { studentNumber: "S007", firstName: "Antoine", lastName: "Garnier", class: "CM1" },
    { studentNumber: "S008", firstName: "Marie", lastName: "Lefebvre", class: "CM1" },
  ];

  for (const studentData of students) {
    const student = await prisma.student.upsert({
      where: { id: `student-${studentData.studentNumber}` },
      update: {},
      create: {
        id: `student-${studentData.studentNumber}`,
        schoolId: school.id,
        studentNumber: studentData.studentNumber,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        status: "ACTIVE",
      },
    });

    await prisma.studentClass.upsert({
      where: { id: `sc-${student.id}-${classe.id}` },
      update: {},
      create: {
        id: `sc-${student.id}-${classe.id}`,
        studentId: student.id,
        classId: classe.id,
        startDate: new Date("2024-09-01"),
      },
    });
  }

  const tasks = [
    {
      title: "Préparer réunion parents",
      description: "Préparer la réunion d'information pour les parents",
      priority: "URGENT",
      status: "TODO",
      dueAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Corriger les devoirs",
      description: "Corriger les cahiers de devoir",
      priority: "HIGH",
      status: "IN_PROGRESS",
      dueAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Mettre à jour notes",
      description: "Mettre à jour les notes du contrôle",
      priority: "NORMAL",
      status: "TODO",
      dueAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Envoyer bulletins",
      description: "Envoyer les bulletins scolaires",
      priority: "NORMAL",
      status: "TODO",
      dueAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const taskData of tasks) {
    await prisma.task.create({
      data: {
        tenantId: tenant.id,
        schoolId: school.id,
        createdById: user.id,
        ...taskData,
      },
    });
  }

  const events = [
    {
      title: "Réunion parents",
      description: "Réunion d'information parents-enseignants",
      type: "reunion",
      status: "PLANNED",
      startsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: "Salle de classe CM1",
    },
    {
      title: "Sortie pédagogique",
      description: "Sortie au musée",
      type: "evenement",
      status: "PLANNED",
      startsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      location: "Musée de l'Histoire",
    },
    {
      title: "Formation pédagogique",
      description: "Formation sur les nouvelles méthodes",
      type: "formation",
      status: "PLANNED",
      startsAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      location: "Salle de formation",
    },
    {
      title: "Fête de l'école",
      description: "Fête annuelle de l'école",
      type: "evenement",
      status: "PLANNED",
      startsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      location: "Cour de l'école",
    },
  ];

  for (const eventData of events) {
    await prisma.event.create({
      data: {
        tenantId: tenant.id,
        schoolId: school.id,
        createdById: user.id,
        ...eventData,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
