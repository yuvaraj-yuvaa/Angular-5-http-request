import { Component } from '@angular/core';
import { ServerService } from './server.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  constructor(public serverservice: ServerService){}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50, //this.getCapacity(),
      id: this.generateId()
    });
  }
  onSave() {
    this.serverservice.storeServers(this.servers).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onGet() {
    this.serverservice.getServers().subscribe(
      // (result: Response) => {
      //   const data = result.json();
      //   console.log(data);
      // },
      (servers: any[] ) => this.servers = servers, //console.log(servers),
      (error) => console.log(error)
    );
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
  // public getCapacity(){
  //   return Math.round(Math.random()*1000);
  // }
}
