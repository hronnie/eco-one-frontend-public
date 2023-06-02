export interface DashboardInfo {
    totalNoStudents: number;
    totalNoTrainings: number;
    totalNoStudentsInMonth: number;
    totalNoStudentsInYear: number;
    studentTrainings: StudentTraining[];

}

export interface StudentTraining {
    name: string,
    noStudents: number,
}
