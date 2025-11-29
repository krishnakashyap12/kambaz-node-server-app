// Script to convert JS data files to JSON for MongoDB import
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the data files
const usersData = (await import('../kambaz-next-js/app/(Kambaz)/Database/users.js')).default;
const coursesData = (await import('../kambaz-next-js/app/(Kambaz)/Database/courses.js')).default;
const modulesData = (await import('../kambaz-next-js/app/(Kambaz)/Database/modules.js')).default;
const assignmentsData = (await import('../kambaz-next-js/app/(Kambaz)/Database/assignments.js')).default;
const enrollmentsData = (await import('../kambaz-next-js/app/(Kambaz)/Database/enrollments.js')).default;

// Write JSON files
const dbPath = join(__dirname, '../kambaz-next-js/app/(Kambaz)/Database');

fs.writeFileSync(join(dbPath, 'users.json'), JSON.stringify(usersData, null, 2));
fs.writeFileSync(join(dbPath, 'courses.json'), JSON.stringify(coursesData, null, 2));
fs.writeFileSync(join(dbPath, 'modules.json'), JSON.stringify(modulesData, null, 2));
fs.writeFileSync(join(dbPath, 'assignments.json'), JSON.stringify(assignmentsData, null, 2));
fs.writeFileSync(join(dbPath, 'enrollments.json'), JSON.stringify(enrollmentsData, null, 2));

console.log('JSON files created successfully!');
console.log('Files created in:', dbPath);

