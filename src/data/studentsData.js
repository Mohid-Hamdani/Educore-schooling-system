// Static dataset — will be replaced with Firebase data later
// const studentsByGrade = {
//   'Grade 1': [
//     {
//       id: 1,
//       name: 'Ali Khan',
//       photo: 'https://i.pravatar.cc/150?img=11',
//       lastObservation: '2026-02-10',
//       latestObservation: {
//         teacherName: 'Ms. Sara',
//         date: '2026-02-10',
//         observationText:
//           'Ali is showing steady improvement in reading comprehension. He can now read short passages and answer basic questions with guidance.',
//         nextStepText:
//           'Practice reading 10 minutes daily with a focus on phonics. Encourage him to summarize what he reads.',
//         weakness: ['Reading Fluency', 'Focus'],
//         strength: ['Confidence', 'Teamwork'],
//         images: [
//           'https://i.pravatar.cc/300?img=11',
//           'https://i.pravatar.cc/300?img=41',
//         ],
//       },
//     },
//     {
//       id: 2,
//       name: 'Fatima Noor',
//       photo: 'https://i.pravatar.cc/150?img=5',
//       lastObservation: '2026-02-08',
//       latestObservation: {
//         teacherName: 'Mr. Ahmed',
//         date: '2026-02-08',
//         observationText:
//           'Fatima excels in mathematics and enjoys solving puzzles. She often helps her peers during group activities.',
//         nextStepText:
//           'Introduce more challenging math problems and encourage leadership in group work.',
//         weakness: ['Writing'],
//         strength: ['Mathematics', 'Helping Others', 'Problem Solving'],
//         images: [],
//       },
//     },
//     {
//       id: 3,
//       name: 'Ahmed Raza',
//       photo: 'https://i.pravatar.cc/150?img=12',
//       lastObservation: '2026-02-06',
//       latestObservation: {
//         teacherName: 'Ms. Sara',
//         date: '2026-02-06',
//         observationText:
//           'Ahmed is very energetic and participates actively in class discussions. He needs guided support for written assignments.',
//         nextStepText:
//           'Provide structured writing templates and additional time for written tasks.',
//         weakness: ['Handwriting', 'Spelling'],
//         strength: ['Verbal Communication', 'Enthusiasm'],
//         images: ['https://i.pravatar.cc/300?img=12'],
//       },
//     },
//     {
//       id: 4,
//       name: 'Sara Malik',
//       photo: 'https://i.pravatar.cc/150?img=9',
//       lastObservation: '2026-02-05',
//       latestObservation: {
//         teacherName: 'Ms. Hina',
//         date: '2026-02-05',
//         observationText:
//           'Sara is a quiet but attentive student. She follows instructions well and completes tasks on time.',
//         nextStepText:
//           'Encourage Sara to participate more in class discussions and group activities.',
//         weakness: [],
//         strength: ['Discipline', 'Attention to Detail'],
//         images: [],
//       },
//     },
//   ],
//   'Grade 2': [
//     {
//       id: 5,
//       name: 'Usman Tariq',
//       photo: 'https://i.pravatar.cc/150?img=13',
//       lastObservation: '2026-02-09',
//       latestObservation: {
//         teacherName: 'Mr. Imran',
//         date: '2026-02-09',
//         observationText:
//           'Usman has shown great improvement in science experiments. He is curious and asks insightful questions.',
//         nextStepText:
//           'Assign a mini research project on a topic of his interest to deepen scientific thinking.',
//         weakness: ['Time Management'],
//         strength: ['Curiosity', 'Scientific Thinking', 'Creativity'],
//         images: [
//           'https://i.pravatar.cc/300?img=13',
//           'https://i.pravatar.cc/300?img=43',
//         ],
//       },
//     },
//     {
//       id: 6,
//       name: 'Ayesha Bibi',
//       photo: 'https://i.pravatar.cc/150?img=21',
//       lastObservation: '2026-02-07',
//       latestObservation: {
//         teacherName: 'Ms. Sara',
//         date: '2026-02-07',
//         observationText:
//           'Ayesha is very creative in arts and crafts. She brings unique ideas to every project.',
//         nextStepText:
//           'Give her more open-ended art projects and encourage storytelling through drawings.',
//         weakness: ['Mathematics'],
//         strength: ['Creativity', 'Imagination', 'Fine Motor Skills'],
//         images: [],
//       },
//     },
//     {
//       id: 7,
//       name: 'Bilal Shah',
//       photo: 'https://i.pravatar.cc/150?img=14',
//       lastObservation: '2026-02-04',
//       latestObservation: {
//         teacherName: 'Mr. Ahmed',
//         date: '2026-02-04',
//         observationText:
//           'Bilal is strong in physical activities but needs improvement in reading. He is a team player during sports.',
//         nextStepText:
//           'Pair reading exercises with physical movement activities to keep him engaged.',
//         weakness: ['Reading', 'Sitting Still'],
//         strength: ['Physical Fitness', 'Teamwork', 'Sportsmanship'],
//         images: ['https://i.pravatar.cc/300?img=14'],
//       },
//     },
//   ],
//   'Grade 3': [
//     {
//       id: 8,
//       name: 'Hira Siddiqui',
//       photo: 'https://i.pravatar.cc/150?img=25',
//       lastObservation: '2026-02-11',
//       latestObservation: {
//         teacherName: 'Ms. Hina',
//         date: '2026-02-11',
//         observationText:
//           'Hira is an outstanding student who consistently performs well across all subjects. She is a natural leader.',
//         nextStepText:
//           'Challenge her with advanced material and leadership roles in class activities.',
//         weakness: [],
//         strength: ['Leadership', 'Academic Excellence', 'Communication'],
//         images: [
//           'https://i.pravatar.cc/300?img=25',
//           'https://i.pravatar.cc/300?img=45',
//         ],
//       },
//     },
//     {
//       id: 9,
//       name: 'Zain Abbas',
//       photo: 'https://i.pravatar.cc/150?img=15',
//       lastObservation: '2026-02-03',
//       latestObservation: {
//         teacherName: 'Mr. Imran',
//         date: '2026-02-03',
//         observationText:
//           'Zain is making progress in math but struggles with word problems. He prefers visual learning methods.',
//         nextStepText:
//           'Use visual aids and diagrams to explain word problems. Provide extra practice worksheets.',
//         weakness: ['Word Problems', 'Reading Comprehension'],
//         strength: ['Visual Learning', 'Number Skills'],
//         images: [],
//       },
//     },
//     {
//       id: 10,
//       name: 'Maryam Iqbal',
//       photo: 'https://i.pravatar.cc/150?img=32',
//       lastObservation: '2026-02-01',
//       latestObservation: {
//         teacherName: 'Ms. Sara',
//         date: '2026-02-01',
//         observationText:
//           'Maryam loves storytelling and is always eager to share. She has strong verbal skills but needs to work on writing structure.',
//         nextStepText:
//           'Introduce paragraph writing exercises and encourage journaling.',
//         weakness: ['Writing Structure', 'Grammar'],
//         strength: ['Storytelling', 'Verbal Expression', 'Confidence'],
//         images: ['https://i.pravatar.cc/300?img=32'],
//       },
//     },
//     {
//       id: 11,
//       name: 'Hassan Ali',
//       photo: 'https://i.pravatar.cc/150?img=17',
//       lastObservation: '2026-01-28',
//       latestObservation: {
//         teacherName: 'Mr. Ahmed',
//         date: '2026-01-28',
//         observationText:
//           'Hassan is a hardworking student who has improved significantly since last term. He needs encouragement to build confidence.',
//         nextStepText:
//           'Give positive reinforcement and assign tasks where he can showcase his strengths.',
//         weakness: ['Self-Confidence', 'Presentation Skills'],
//         strength: ['Hard Work', 'Persistence', 'Listening'],
//         images: [],
//       },
//     },
//   ],
// };

// export const gradeOptions = ['Grade 1', 'Grade 2', 'Grade 3'];

// /**
//  * Get a flat list of all students across all grades
//  */
// export const getAllStudents = () => {
//   return Object.values(studentsByGrade).flat();
// };

// /**
//  * Find a student by their ID
//  */
// export const getStudentById = (id) => {
//   const numericId = Number(id);
//   return getAllStudents().find((s) => s.id === numericId) || null;
// };

// export default studentsByGrade;
