import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../services/member.service";
import {CenterService} from "../../services/center.service";
import {LOCAL_STORAGE_KEY_USERNAME} from "../../constants/localStorageKeys.constant";
import {Member} from "../../interfaces/member.model";

@Component({
    templateUrl: 'student.component.html',
    styleUrls: ['student.component.scss']
})
export class StudentComponent implements OnInit{

    allStudents: Member[] = [];

    constructor(private memberService: MemberService,
                private centerService: CenterService) {
    }

    ngOnInit(): void {
        const currentUser: string | null = localStorage.getItem(LOCAL_STORAGE_KEY_USERNAME);
        if (currentUser !== null) {
            this.centerService.getCenterCodeByUsername(currentUser).subscribe(
                centerCode => {
                    this.memberService.getAllMembers(centerCode).subscribe(
                        response => {
                            this.allStudents = response;
                            console.table(response);
                        },
                        error => {
                            console.log(error);
                        }
                    )
                },
                error => {
                    console.log(error);
                }
            );
        }
    }
}
