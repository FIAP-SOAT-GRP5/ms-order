import { Before, Given, Then, When, } from '@cucumber/cucumber';
import { strictEqual } from "assert";
import { GetOrderUseCase } from "../../src/domain/application/use-cases/order/get-order.use-case";
import { makeOrderToCreate } from "../factories/makeOrder";
import { InMemoryOrderRepository } from "../repositories/in-memory-order.repository";

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: GetOrderUseCase;
let createdOrder;
let order;

Before(() => {
	inMemoryOrderRepository = new InMemoryOrderRepository()
	sut = new GetOrderUseCase(inMemoryOrderRepository)
})

Given('I have a registered order', async () => {
	const orderToCreate = makeOrderToCreate()
	createdOrder = await inMemoryOrderRepository.create(orderToCreate)
})

When('I inform the order id', async () => {
	order = await sut.findById(createdOrder.id);
	return order;
})

Then('the order is returned', async () => {
	strictEqual(order.id, createdOrder.id);
})

Given(`I have some registered order`, async () => {
	const orderToCreate = makeOrderToCreate()
	createdOrder = await inMemoryOrderRepository.create(orderToCreate)
});

When(`I do not inform the order id`, async () => {
	order = await sut.findById(undefined);
	return order;
});

Then(`the order is not returned`, () => {
	strictEqual(order, undefined);
});
