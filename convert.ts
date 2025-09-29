import { readFileSync, writeFileSync } from "fs";
import { parse } from "csv-parse/sync";
import { GradeRow, GradesResult } from "./src/grade";

const csvGrade = readFileSync("src/assets/grades.csv");

const grades: GradeRow[] = parse(csvGrade, {
  columns: true,
  skip_empty_lines: true,
  delimiter: ";",
  bom: true,
});

// tantárgyi átlagok
const subjectMap = new Map<string, number[]>();
for (const row of grades) {
  if (!subjectMap.has(row.subject)) subjectMap.set(row.subject, []);
  subjectMap.get(row.subject)!.push(Number(row.grade));
}
const subjects = Array.from(subjectMap.entries()).map(([subject, grades]) => ({
  subject,
  grade: Number(
    (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2)
  ),
}));

// diák átlagok
const studentMap = new Map<string, number[]>();
for (const row of grades) {
  if (!studentMap.has(row.name)) studentMap.set(row.name, []);
  studentMap.get(row.name)!.push(Number(row.grade));
}
const students = Array.from(studentMap.entries()).map(([student, grades]) => ({
  student,
  grade: Number(
    (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2)
  ),
}));

const result: GradesResult = { subjects, students };

writeFileSync("grades-result.json", JSON.stringify(result, null, 2), "utf-8");

console.log("Eredmény mentve: grades-result.json");
