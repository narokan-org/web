import { describe, expect, it, beforeEach, vi, type Mock } from 'vitest';
import { CompanyService } from './company-service';
import { LoggingService } from './logging-service';
import { UserService } from './user-service';

describe('CompanyService', () => {
	let companyService: CompanyService;
	let userService: UserService;
	const fetchFn: Mock<typeof fetch> = vi.fn();

	beforeEach(() => {
		const loggingService = new LoggingService();
		userService = new UserService(fetchFn, loggingService);
		companyService = new CompanyService(fetchFn, loggingService, userService);
	});

	it('should return risk categories', async () => {
		userService.getUser = vi.fn().mockResolvedValue({ roles: ['authenticated'] });

		const mockResponse: Partial<Response> = {
			ok: true,
			json: vi.fn().mockResolvedValue({ value: [{ Id: 1, CategoryName: 'Risk Category 1' }] })
		};

		fetchFn.mockResolvedValue(mockResponse as Response);

		const riskCategories = await companyService.getRiskCategories(1);

		expect(riskCategories).toEqual([{ id: 1, name: 'Risk Category 1' }]);
	});

	it('should return empty if user is not authenticated', async () => {
		userService.getUser = vi.fn().mockResolvedValue({ roles: ['anonymous'] });

		const riskCategories = await companyService.getRiskCategories(1);

		expect(riskCategories).toHaveLength(0);
	});

	it('should be empty if response is not ok', async () => {
		userService.getUser = vi.fn().mockResolvedValue({ roles: ['authenticated'] });

		const mockResponse: Partial<Response> = {
			ok: false
		};

		fetchFn.mockResolvedValue(mockResponse as Response);

		const riskCategories = await companyService.getRiskCategories(1);

		expect(riskCategories).toHaveLength(0);
	});
});
