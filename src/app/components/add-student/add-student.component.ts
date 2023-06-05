import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../interfaces/member.model";
import {MemberService} from "../../services/member.service";
import {LOCAL_STORAGE_KEY_CENTER_CODE} from "../../constants/localStorageKeys.constant";

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

    @Output() isCreateSuccessful = new EventEmitter<boolean>();
    @Output() isCreateFailed = new EventEmitter<boolean>();
    @Output() loadMembers = new EventEmitter<void>();
    @Output() pushNewMemberToRowData = new EventEmitter<Member>();

    newMemberForm: FormGroup | undefined;
    centerCode: string | null = null;

    constructor(private memberService: MemberService) {
    }

    ngOnInit(): void {
        this.centerCode = localStorage.getItem(LOCAL_STORAGE_KEY_CENTER_CODE);
        this.newMemberForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
            'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(100)]),
            'mobile': new FormControl(null, [Validators.required, Validators.pattern('^[0-9+]+$')]),
            'notes': new FormControl(null, [Validators.maxLength(200)]),
        });
    }

    createMember() {
        this.isCreateSuccessful.emit(false);
        this.isCreateFailed.emit(false);
        if (this.newMemberForm === undefined) {
            return;
        }
        const memberData: Member = this.newMemberForm.value;
        if (this.centerCode === null) {
            this.centerCode = '';
        }
        this.memberService.createMember(this.centerCode, memberData).subscribe({
            next: (response) => {
                this.isCreateSuccessful.emit(true);
                this.loadMembers.emit();
                console.log('Member created successfully', response);
            },
            error: (error) => {
                this.isCreateFailed.emit(true);
                console.error('There was an error while creating the member', error);
            }
        });

        this.pushNewMemberToRowData.emit(this.newMemberForm.value);
        this.newMemberForm.reset();
    }


}
