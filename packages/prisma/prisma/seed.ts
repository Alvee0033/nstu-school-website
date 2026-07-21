import { PrismaClient, Role, NoticeCategory, NoticeStatus } from '@prisma/client';

const prisma = new PrismaClient();

// Pre-calculated bcrypt hash of "AdminPass123!" (rounds: 12)
const ADMIN_PASSWORD_HASH = '$2b$12$VdPAfHHLrAcKU/Yw4JxryO/hdSF9R0BJKKpxe8dNmnQYSQoNRSEpW';

async function main() {
  console.log('Seeding database with real assets...');

  // Clean existing data for idempotency
  await prisma.auditLog.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.result.deleteMany();
  await prisma.student.deleteMany();
  await prisma.section.deleteMany();
  await prisma.class.deleteMany();
  await prisma.examSchedule.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.principal.deleteMany();
  await prisma.schoolInfo.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Super Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.edu.bd' },
    update: {},
    create: {
      email: 'admin@school.edu.bd',
      name: 'Dr. John Doe',
      passwordHash: ADMIN_PASSWORD_HASH,
      role: Role.SUPER_ADMIN,
      isActive: true,
    },
  });
  console.log(`Created Super Admin: ${admin.email}`);

  // 2. Create School Info
  const schoolInfo = await prisma.schoolInfo.upsert({
    where: { eiin: '123456' },
    update: {},
    create: {
      nameEn: 'Notun Kuri High School',
      nameBn: 'নতুন কুঁড়ি হাই স্কুল',
      eiin: '123456',
      emis: '789012',
      historyEn: 'Notun Kuri High School was established in 2018 to provide standard education in Noakhali.',
      historyBn: 'নতুন কুঁড়ি হাই স্কুল নোয়াখালী অঞ্চলের শিক্ষার্থীদের মানসম্মত শিক্ষা প্রদানের লক্ষ্যে ২০১৮ সালে প্রতিষ্ঠিত হয়।',
      visionEn: 'To be a center of excellence in modern primary and secondary education.',
      visionBn: 'আধুনিক প্রাথমিক ও মাধ্যমিক শিক্ষায় শ্রেষ্ঠত্বের কেন্দ্রবিন্দু হওয়া।',
      missionEn: 'Nurturing talent and building strong moral character.',
      missionBn: 'মেধা লালন ও নৈতিক চরিত্র গঠন করা।',
      address: 'NSTU Campus, Sonapur, Noakhali-3814',
      phone: '+8801700000000',
      email: 'info@school.edu.bd',
      coverImageUrl: '/hero-bg.png',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.119253457597!2d91.1009133!3d22.7915332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754af5d4ebff45f%3A0xe543c7b744d2d46e!2sNoakhali%20Science%20and%20Technology%20University!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd',
    },
  });

  // 3. Create Principals
  await prisma.principal.createMany({
    data: [
      {
        name: 'Professor Dr. Muhammad Alam',
        designation: 'Headmaster',
        type: 'HEADMASTER',
        messageEn: 'Welcome to our school. We aim to build a bright future for our students.',
        messageBn: 'আমাদের বিদ্যালয়ে আপনাকে স্বাগত। আমরা শিক্ষার্থীদের জন্য একটি উজ্জ্বল ভবিষ্যৎ গড়ে তুলতে প্রতিশ্রুতিবদ্ধ।',
        photoUrl: '/principal.png',
        isActive: true,
        order: 1,
        schoolInfoId: schoolInfo.id,
      },
      {
        name: 'Dr. Shakila Rahman',
        designation: 'SMC Chairman',
        type: 'SMC_CHAIRMAN',
        messageEn: 'Education is the key to all success. We work together for the best outcomes.',
        messageBn: 'শিক্ষা সকল সফলতার চাবিকাঠি। আমরা শিক্ষার্থীদের সর্বাঙ্গীন মঙ্গলের জন্য কাজ করে যাচ্ছি।',
        photoUrl: '/chairman.png',
        isActive: true,
        order: 2,
        schoolInfoId: schoolInfo.id,
      },
    ],
  });

  // 4. Create Notices
  await prisma.notice.createMany({
    data: [
      {
        titleEn: 'Admission opens for Academic Year 2026',
        titleBn: '২০২৬ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি',
        contentEn: 'Applications are invited for admissions from Class 6 to 9 for the upcoming academic session.',
        contentBn: 'আসন্ন শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণীতে ভর্তির জন্য আবেদন আহ্বান করা হচ্ছে।',
        category: NoticeCategory.ADMISSION,
        status: NoticeStatus.PUBLISHED,
        isUrgent: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
      {
        titleEn: 'Annual Examination Schedule 2026',
        titleBn: 'বার্ষিক পরীক্ষার সময়সূচী ২০২৬',
        contentEn: 'The annual examinations will begin on November 25, 2026. The schedule is available online.',
        contentBn: 'বার্ষিক পরীক্ষা আগামী ২৫ নভেম্বর ২০২৬ থেকে শুরু হবে। পরীক্ষার সময়সূচী ওয়েবসাইটে পাওয়া যাবে।',
        category: NoticeCategory.EXAM,
        status: NoticeStatus.PUBLISHED,
        isUrgent: false,
        publishedAt: new Date(),
        authorId: admin.id,
      },
    ],
  });

  // 5. Create Teachers
  await prisma.teacher.createMany({
    data: [
      {
        nameEn: 'Mr. Abul Kalam',
        nameBn: 'জনাব আবুল কালাম',
        designation: 'Assistant Teacher',
        department: 'Science',
        subject: 'General Science',
        qualification: 'B.Sc (Hons), M.Sc in Physics',
        email: 'kalam@school.edu.bd',
        phone: '+8801711111111',
        photoUrl: '/teacher_1.png',
        order: 1,
        isActive: true,
      },
      {
        nameEn: 'Mrs. Fatema Begum',
        nameBn: 'মিসেস ফাতেমা বেগম',
        designation: 'Senior Teacher',
        department: 'Mathematics',
        subject: 'Mathematics',
        qualification: 'B.Sc, B.Ed',
        email: 'fatema@school.edu.bd',
        phone: '+8801722222222',
        photoUrl: '/teacher_2.png',
        order: 2,
        isActive: true,
      },
    ],
  });

  // 6. Create Classes & Sections
  const class6 = await prisma.class.create({
    data: {
      nameEn: 'Class Six',
      nameBn: 'ষষ্ঠ শ্রেণী',
      grade: 6,
    },
  });

  const secA = await prisma.section.create({
    data: {
      name: 'A',
      classId: class6.id,
    },
  });

  // 7. Create Student
  const student = await prisma.student.create({
    data: {
      studentId: 'ST1001',
      nameEn: 'Kamal Uddin',
      nameBn: 'কামাল উদ্দিন',
      rollNumber: 1,
      sectionId: secA.id,
      gender: 'Male',
      isMerit: true,
    },
  });

  // 8. Create Exam
  const exam = await prisma.exam.create({
    data: {
      titleEn: 'Annual Exam 2026',
      titleBn: 'বার্ষিক পরীক্ষা ২০২৬',
      year: 2026,
      isPublished: true,
    },
  });

  // 9. Create Result
  await prisma.result.createMany({
    data: [
      {
        studentId: student.id,
        examId: exam.id,
        sectionId: secA.id,
        subject: 'Mathematics',
        marksObtained: 85,
        totalMarks: 100,
        grade: 'A+',
        gpa: 5.0,
        isPublished: true,
      },
      {
        studentId: student.id,
        examId: exam.id,
        sectionId: secA.id,
        subject: 'General Science',
        marksObtained: 78,
        totalMarks: 100,
        grade: 'A',
        gpa: 4.0,
        isPublished: true,
      },
    ],
  });

  console.log('Database seeded with images successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
