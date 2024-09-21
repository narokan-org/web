import { fail } from '@sveltejs/kit';

export async function createRisk({ locals, request }: { locals: App.Locals; request: Request }) {
	const data = await request.formData();

	const formData = {
		title: data.get('title')?.toString(),
		description: data.get('description')?.toString(),
		category: data.get('category')?.toString(),
		owners: data.getAll('owners'),
		entities: data.getAll('entities'),
		likelihood: data.get('likelihood')?.toString(),
		impact: data.get('impact')?.toString(),
		response: data.get('response')?.toString(),
		notes: data.get('notes')?.toString()
	};

	if (
		!formData.title ||
		!formData.category ||
		formData.owners.length === 0 ||
		formData.entities.length === 0 ||
		!formData.likelihood ||
		!formData.impact ||
		!formData.response
	) {
		return fail(400, { message: 'Missing required fields' });
	}

	const newRisk = await locals.riskService.createRisk({
		title: formData.title,
		description: formData.description,
		categoryRiskId: Number(formData.category),
		companyId: Number(formData.entities[0])
	});

	if (!newRisk) {
		return fail(500, { message: 'Failed to create risk' });
	}

	const newAssessment = await locals.assessmentService.createAssessment({
		riskId: newRisk.id,
		assessment: {
			likelihoodOptionId: Number(formData.likelihood),
			impactOptionId: Number(formData.impact),
			responseOptionId: Number(formData.response),
			notes: formData.notes
		}
	});

	if (!newAssessment) {
		return fail(500, { message: 'Failed to create assessment' });
	}

	return {
		success: true
	};
}
