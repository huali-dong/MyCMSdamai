// 利用events模块创建可以定义事件和触发事件的bus对象，用来实现多模块件的通信 （观察者）

import EventEmitter from 'events'

class Bus extends EventEmitter {}

export default new Bus()