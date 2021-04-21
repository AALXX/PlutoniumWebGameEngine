import { MessageSubscriptionNode } from './MessageSubscriptionNode.js';
import { MessagePriority } from './Message.js';
//* USed for Sending messages
export class MEssageBus {
    constructor() {
    }
    static addSubscrition(code, handelr) {
        if (MEssageBus._subscriptions[code] !== undefined) {
            MEssageBus._subscriptions[code] = [];
        }
        if (MEssageBus._subscriptions[code].indexOf(handelr) !== -1) {
            console.warn("Attemting to add duplicate handler to code:" + code);
        }
        else {
            MEssageBus._subscriptions[code].push(handelr);
        }
    }
    static removeSubscrition(code, handelr) {
        if (MEssageBus._subscriptions[code] === undefined) {
            console.warn("cannot unsubscribe handler from code:" + code);
            return;
        }
        let nodeIndex = MEssageBus._subscriptions[code].indexOf(handelr);
        if (MEssageBus._subscriptions[code].indexOf(handelr) !== -1) {
            MEssageBus._subscriptions[code].splice(nodeIndex, 1);
        }
    }
    static post(message) {
        console.log(`Message posted ${message}`);
        let handlers = MEssageBus._subscriptions[message.code];
        if (handlers === undefined) {
            return;
        }
        for (let h of handlers) {
            if (message.priority === MessagePriority.HIGH) {
                h.onMessage(message);
            }
            else {
                MEssageBus._normalMessageQueue.push(new MessageSubscriptionNode(message, h));
            }
        }
    }
    static update(time) {
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
MEssageBus._subscriptions = {};
MEssageBus._normalQueueMessagePerUpdate = 20;
MEssageBus._normalMessageQueue = [];
