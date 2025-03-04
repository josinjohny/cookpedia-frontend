import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent {
  allDownload: any = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllDownloadList()
  }

  getAllDownloadList() {
    this.api.allDownloadListApi().subscribe((res: any) => {
      this.allDownload = res
      console.log(this.allDownload);
    })
  }

}
