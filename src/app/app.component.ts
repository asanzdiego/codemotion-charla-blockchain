import { Component, OnInit } from '@angular/core';
import { MessagesService } from './services/messages.service';
import { Web3Service } from './services/web3.service';
import { Router } from '@angular/router';
import { StorageUtil } from './util/storage.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  error = '';

  constructor(
    private web3Service: Web3Service,
    private messagesService: MessagesService,
    private router: Router) {
  }

  ngOnInit() {

    this.messagesService.getErrorMessage().subscribe(error => {
      this.error = error;
    });

    this.messagesService.getNewUserAddressMessage().subscribe(userAddress => {

      console.log('AppComponent->userAddress', userAddress);
      //window.location.reload();
      window.location.href = 'user'
    });

    this.web3Service.init();
  }

  goInit() {
    this.router.navigate(['/init']);
  }

}
