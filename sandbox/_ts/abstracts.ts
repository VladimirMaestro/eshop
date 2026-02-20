

abstract class UserRequest {
    public type: string;

    protected constructor(type: string) {
        this.type = type;
    }

    process(): void {
        this.register();
        this.handle();
        this.notify();
    }

    register() {
        console.log(`[Общий] 📝 Запрос "${this.type}" зарегистрирован в системе.`);
    }

    // --- Абстрактный Метод ---
    // ЭТОТ МЕТОД ДОЛЖЕН БЫТЬ РЕАЛИЗОВАН!
    abstract handle(): void;

    notify() {
        console.log(`[Общий] 📧 Клиенту отправлено уведомление о завершении.`);
    }
}



class ComplaintRequest extends UserRequest {

    constructor() {
        super('Complain');
    }

    handle(): void {
        console.log('Handle complain');
    }
}

class OrderRequest extends UserRequest {

    constructor() {
        super('Order');
    }

    handle(): void {
        console.log('Handle order');
    }
}

const requestA: UserRequest = new ComplaintRequest();
const requestB: UserRequest = new OrderRequest();



