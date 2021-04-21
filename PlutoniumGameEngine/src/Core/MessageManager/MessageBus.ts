  
import { IMessageHandler } from './IMessageHandler.js';
import { MessageSubscriptionNode } from './MessageSubscriptionNode.js';
import { Message, MessagePriority } from './Message.js';

//* USed for Sending messages
export class MEssageBus{

  private static _subscriptions: { [code: string]: IMessageHandler[] } = {};

  public static _normalQueueMessagePerUpdate: number = 20;
  
  private static _normalMessageQueue: MessageSubscriptionNode[] = []; 
  
  private constructor() {
    
  }

  public static addSubscrition(code: string, handelr: IMessageHandler): void{
    if (MEssageBus._subscriptions[code] !== undefined) {
      MEssageBus._subscriptions[code] = [];
    }
    if (MEssageBus._subscriptions[code].indexOf(handelr) !== -1) {
      console.warn("Attemting to add duplicate handler to code:" + code);
    } else {
      MEssageBus._subscriptions[code].push(handelr);
    }
  }

  public static removeSubscrition(code: string, handelr: IMessageHandler): void{
    if (MEssageBus._subscriptions[code] === undefined) {
      console.warn("cannot unsubscribe handler from code:" + code);
      return;
    }

    let nodeIndex = MEssageBus._subscriptions[code].indexOf(handelr);
    if (MEssageBus._subscriptions[code].indexOf(handelr) !== -1) {
      MEssageBus._subscriptions[code].splice(nodeIndex, 1);
    }
  }

  public static post(message: Message): void{
    console.log(`Message posted ${message}`);
    let handlers = MEssageBus._subscriptions[message.code];

    if (handlers === undefined) {
      return;
    }

    for (let h of handlers) {
      if (message.priority === MessagePriority.HIGH) {
        h.onMessage(message);
      } else {
        MEssageBus._normalMessageQueue.push(new MessageSubscriptionNode(message, h));
      }
    }
  }

  public static update(time: number): void{
    if (MEssageBus._normalMessageQueue.length === 0) {
      return;
    }
    let MessageLimit = Math.min(MEssageBus._normalQueueMessagePerUpdate, MEssageBus._normalMessageQueue.length);

    for (let i = 0; i < MessageLimit; i++) {
      
      
      let node = MEssageBus._normalMessageQueue.pop();
      node.handler.onMessage(node.message);
    }
  }
}