import { Request, onRequest } from 'firebase-functions/v2/https'
import { createUser } from './index'

describe('CreateUser Function', () => {
	let originalFirestoreAdd: jest.SpyInstance<any, unknown[]>

	beforeAll(() => {
		originalFirestoreAdd = jest.spyOn(
			require('firebase-admin').firestore.CollectionReference.prototype,
			'add',
		)
		originalFirestoreAdd.mockResolvedValue({ id: 0 })
	})

	afterAll(() => {
		originalFirestoreAdd.mockRestore()
	})

	it('should respond with 400 if method is not POST', async () => {
		const req = <Request>{
			method: 'GET',
			body: { name: 'John Doe' },
		}

		const res: any = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn(),
		}

		await onRequest(createUser)(req, res)

		expect(res.status).toHaveBeenCalledWith(400)
		expect(res.send).toHaveBeenCalledWith('Método de request precisa ser POST')
	})

	it('should respond with 200 and a success message if POST request is valid', async () => {
		const req = <Request>{
			method: 'POST',
			body: { name: 'John Doe' },
		}
		const res: any = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn(),
		}

		await onRequest(createUser)(req, res)

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith({ success: true, id: 0 })
	})

	it('should handle errors and respond with 500 status', async () => {
		const req = <Request>{
			method: 'POST',
			body: { name: 'John Doe' },
		}
		const res: any = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn(),
		}

		originalFirestoreAdd.mockRejectedValueOnce(new Error('Test error'))

		await onRequest(createUser)(req, res)

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.send).toHaveBeenCalledWith(
			expect.objectContaining({ message: 'Test error' }),
		)
	})
})
