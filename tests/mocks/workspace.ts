import { faker } from '@faker-js/faker';
import { truncateString } from '../utils/test-utils';
export class Workspace {
	readonly name: string;

	constructor() {
		this.name = truncateString(faker.company.name(), 16);
	}
}
