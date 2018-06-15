import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {VideoService} from "./video/video.service";
import {Video} from "./video/video";
import {VideoOverlayService} from "./video-overlay/video-overlay.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'youtube4kidz';
  videos: Video[]

  BACKEND_URL: string = environment.backendUrl + ':' + environment.backendPort + '/';

  constructor(private videoService: VideoService,
              private videoOverlayService: VideoOverlayService) {
  }

  ngOnInit(): void {
    this.videoService
      .getAll()
      .subscribe((data: any[]) => this.videos = data,
        error => () => {
          console.error("An error occured, when tried to load the videos")
        },
        () => {
          console.log("Finished loading the videos: ")
        })
  }

  isVideoSelected():boolean{
    return this.videoOverlayService.isVideoSelected();
  }

  private selectVideo(video: Video): void {
    this.videoOverlayService.selectVideo(video)
  }

}