interface Order {
  id: string;
  // 他のプロパティもここに追加できます
}

interface ICommand {
  execute: (orders: Order[]) => void;
}

class OrderManager {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  execute(command: ICommand): void {
    command.execute(this.orders);
  }
}

class Command implements ICommand {
  execute: (orders: Order[]) => void;

  constructor(execute: (orders: Order[]) => void) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order: Order): ICommand {
  return new Command((orders: Order[]) => {
    orders.push(order);
    console.log(`Placed order (${order.id})`);
  });
}

function CancelOrderCommand(id: string): ICommand {
  return new Command((orders: Order[]) => {
    const index = orders.findIndex((order) => order.id === id);
    if (index > -1) {
      orders.splice(index, 1);
      console.log(`Canceled order (${id})`);
    }
  });
}

function TrackOrderCommand(id: string): ICommand {
  return new Command((orders: Order[]) => {
    const order = orders.find((order) => order.id === id);
    if (order) {
      console.log(`Tracking order (${id})`);
    } else {
      console.log(`Order (${id}) not found`);
    }
  });
}

const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
