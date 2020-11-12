import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { QrcodeService } from '../services/qrcode.service';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    sex: ['', Validators.required],
    age: ['', Validators.required],
    city: ['', Validators.required],
    barangay: ['', Validators.required],
  });
  loading = false;
  elementType = 'url';
  value:string;
  message:string;
  error:any;

  subscribe:any;
  constructor(private platform: Platform, private qrcodeService: QrcodeService, private fb: FormBuilder, private storage: Storage, private router: Router) {
    this.subscribe = this.platform.backButton.subscribeWithPriority(77777, () =>{
      if (this.constructor.name == "LoginPage")
      {
        if (window.confirm("do you want to exit app"))
        {
          navigator["app"].exitApp();
        }
      }
    })
   }
  ngOnInit() {
    this.qrcodeService.currentMessage.subscribe(message => 
      {
        this.message = message;
        if (message!= null) {
          console.log('ionic');
          this.router.navigate(['/login']);
        }
      },
      err => console.error('Observer got an error: ' + <any>err),
      () => {
        console.log('Observer got a complete notification');
        this.router.navigate(['/login']);
    });
  }
  newMessage() {
    this.qrcodeService.changeMessage("Hello")
  }
  onSubmit() {
    this.loading = true;
    console.log(this.profileForm.value);
    this.qrcodeService.register(this.profileForm.value).subscribe(
      res => 
      {
        this.storage.set('codea744ea510e34', res.toString());
        this.qrcodeService.changeMessage(res.toString())
      },
      err => {
        this.error = err.message;
        console.error('Observer got an error: ' + <any>err);

      },
      () => {
        this.loading = false;
        console.log('Observer got a complete notification');
        this.router.navigate(['/login']);
    })
  }
  
  getTodo() {
    return from(this.storage.get('name'))
      .pipe(map(response => response));
  }
}
