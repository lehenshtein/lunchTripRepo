import {Component, Input, OnInit} from '@angular/core';

import {IPhoto} from '@shared/interfaces/photo.interface';
import {IUser} from '@shared/interfaces/user.interface';

import {FileItem, FileUploader} from 'ng2-file-upload';

import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-member-photo-editor',
  templateUrl: './member-photo-editor.component.html',
  styleUrls: ['./member-photo-editor.component.css']
})
export class MemberPhotoEditorComponent implements OnInit {
  @Input() user: IUser;
  baseUrl = environment.apiUrl;
  photos: Array<IPhoto>;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  response = '';

  constructor() {
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

    this.uploader.response.subscribe(res => {
      this.response = res;
      console.log(res);
    });
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
      }
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
