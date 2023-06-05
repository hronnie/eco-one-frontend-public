export interface DashboardInfo {
    totalNoStudents: number;
    totalNoTrainings: number;
    totalNoStudentsInMonth: number;
    totalNoStudentsInYear: number;
    studentTrainings: StudentTraining[];
    studentPrereqTrainings: StudentPrereqTraining[];

}

export interface StudentTraining {
    name: string,
    noStudents: number,
}

export interface StudentPrereqTraining {
    name: string,
    noStudents: number,
}
