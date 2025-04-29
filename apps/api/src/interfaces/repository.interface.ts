export interface Repository<Select, Insert, Update> {
	findById(id: string): Promise<Select>;
	create(todo: Insert): Promise<Select>;
	update(todo: Update): Promise<Select>;
	delete(id: string): Promise<Select>;
	find(): Promise<Select[]>;
}
