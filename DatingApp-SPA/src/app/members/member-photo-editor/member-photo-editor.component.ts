import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IPhoto} from '@shared/interfaces/photo.interface';
import {IUser} from '@shared/interfaces/user.interface';
import {AlertService} from '@shared/services/alert.service';
import {AuthService} from '@shared/services/auth.service';
import {UserService} from '@shared/services/user.service';

import {FileItem, FileUploader} from 'ng2-file-upload';

import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-member-photo-editor',
  templateUrl: './member-photo-editor.component.html',
  styleUrls: ['./member-photo-editor.component.css']
})
export class MemberPhotoEditorComponent implements OnInit {
  @Input() user: IUser;
  @Output() memberPhotoChange = new EventEmitter<string>();
  baseUrl = environment.apiUrl;
  photos: Array<IPhoto>;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  currentMain: IPhoto;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.photos = this.user.photos;
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}/api/users/${this.user.id}/photos`,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 5 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file: FileItem) => file.withCredentials = false;

    this.uploader.onSuccessItem = (item, response) => {
      if (response) {
        const res: IPhoto = JSON.parse(response);
        const photo: IPhoto = {
          dateAdded: res.dateAdded,
          id: res.id,
          url: res.url,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: IPhoto) {
    this.userService.setMainPhoto(this.user.id, photo.id).subscribe(
      () => {
        this.currentMain = this.photos.filter(el => el.isMain === true)[0];
        this.currentMain.isMain = false;
        photo.isMain = true;
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      },
      error => this.alertService.error(error)
    );
  }

  deletePhoto(id: number) {
    this.alertService.confirm('Are you sure you want to delete this photo?',
      () => this.userService.deletePhoto(this.user.id, id).subscribe(() => {
          const photoToRemove = this.photos.findIndex(p => p.id === id);
          if (photoToRemove !== -1) {
            this.photos.splice(photoToRemove, 1);
            this.alertService.success('Photo has ben deleted');
          }
        },
        () => this.alertService.error('Failed to delete')
      ));
  }

}
