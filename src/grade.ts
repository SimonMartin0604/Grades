export interface GradeRow {
    student: string;
    subject: string;
    grade: number;
}

export interface GradesResult {
    subjects: { subject: string; grade: number }[];
    students: { student: string; grade: number }[];
}
