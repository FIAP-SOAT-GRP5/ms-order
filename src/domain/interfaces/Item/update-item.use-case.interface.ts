import { UpdateItemDto } from '../../dtos/update-item.dto';
import { Item } from '../../entities/item.entity';

export interface IUpdateItemUseCase {
	updateItem(idItem: number, item: UpdateItemDto): Promise<Item>;
}
