import { UpdateItemUseCase } from "../../../../src/domain/application/use-cases/item/update-item.use-case";
import { UpdateItemDto } from "../../../../src/domain/enterprise/dtos/update-item.dto";
import { makeSnackCategory } from "../../../factories/makeCategory";
import { makeItem } from "../../../factories/makeItem";
import { InMemoryItemRepository } from "../../../repositories/in-memory-item.repository";

let inMemoryItemRepository: InMemoryItemRepository;
let sut: UpdateItemUseCase;

describe("UpdateItemUseCase", () => {

	beforeEach(() => {
		inMemoryItemRepository = new InMemoryItemRepository()
		sut = new UpdateItemUseCase(inMemoryItemRepository)
	})

	it("should be able to update a item", async () => {
		const item = makeItem()
		const category = makeSnackCategory()
		item.category = category
		await inMemoryItemRepository.createItem(item)

		expect(item.id).toBeDefined()
		expect(item.price).toBe(5.00)
		const dto = new UpdateItemDto()
		dto.price = 10.00
		const response = await sut.updateItem(item.id, dto);

		expect(response.price).toBe(10.00)
		expect(inMemoryItemRepository.items).toHaveLength(1)
	})
})