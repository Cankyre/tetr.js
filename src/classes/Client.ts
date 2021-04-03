/*

MIT License

Copyright (c) 2021 Jakob de Guzman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import WebsocketManager, { Handling } from "../managers/WebsocketManager";
import EventEmitter from "events";

export default class Client extends EventEmitter {
  // https://nodejs.dev/learn/the-nodejs-event-emitter
  private ws: WebsocketManager;
  public token!: string;

  public constructor(
    public handling: Handling = {
      arr: "1",
      das: "1",
      sdf: "5",
      safelock: true,
    }
  ) {
    super();

    this.ws = new WebsocketManager(this);
  }

  public login(token: string): void {
    this.token = token;
    this.ws.connect();
  }

  public socialDM(recipient: string, msg: string): void {
    this.ws.send({ command: "social.dm", data: { recipient, msg } });
  }
}
