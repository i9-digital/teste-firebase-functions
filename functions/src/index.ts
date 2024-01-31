import * as admin from 'firebase-admin'
import { firestore } from 'firebase-functions'
import { onRequest } from 'firebase-functions/v2/https'
import { z } from 'zod'

const createUserSchema = z.object({
	name: z.string(),
})

type CreateUser = z.infer<typeof createUserSchema>

admin.initializeApp()

export const createUser = onRequest(async (request, response) => {
	if (request.method !== 'POST') {
		response.status(400).send('Método de request precisa ser POST')
	}

	const body: CreateUser = createUserSchema.parse(request.body)

	const data = {
		increment_id: 0,
		name: body.name,
	}

	try {
		const docRef = await admin.firestore().collection('users').add(data)

		response.status(200).send({ success: true, id: docRef.id })
	} catch (error) {
		response.status(500).send(error)
	}
})

export const onUserCreate = firestore
	.document('users/{userId}')
	.onCreate(async (snapshot) => {
		const usersRef = admin.firestore().collection('users')
		let lastId = 0

		const lastUser = await usersRef
			.orderBy('increment_id', 'desc')
			.limit(1)
			.get()
		if (!lastUser.empty) {
			lastId = lastUser.docs[0].get('increment_id')
		}

		return snapshot.ref.update({
			increment_id: lastId + 1,
		})
	})
