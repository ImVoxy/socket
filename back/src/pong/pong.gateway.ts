import {
  MessageBody,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'socket.io'

@WebSocketGateway(8001, {cors: '*'})
export class PongGateway
implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private pingInterval: NodeJS.Timeout;

  async handleConnection( client: Socket)
  {
    // this.server.emit('ping', { data: "connected to serv" });
    console.log(`User ${client.id} Connected ༼ つ ◕_◕ ༽つ`)
    
    this.pingInterval = setInterval(() => {
      client.emit('ping', 'PING');
    }, 1000);
  
    client.on('disconnect', () => {
      clearInterval(this.pingInterval);
    });
  
    client.on('changeTimer', (newInterval) => {
      clearInterval(this.pingInterval);
      this.pingInterval = setInterval(() => {
        client.emit('ping', 'PING');
      }, newInterval);
    });
  }


  
  handleDisconnect(client: Socket)
  {
    console.log(`User ${client.id} Disconnected (◞ ‸ ◟ ；)`)
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
    this.server.emit('message', message);
  }

  @SubscribeMessage('pong')
  handlePong(@MessageBody() data: string): void {
    console.log(data);
    // this.server.emit('ping', data);
  }

  // @SubscribeMessage('changeTimer')
  // changeTimerg(@MessageBody() data: number): void {
  //   clearInterval(this.pingInterval);
  //   this.pingInterval = setInterval(() => {
  //     client.emit('ping', 'PING');
  //   }, newInterval);
  // }
}
