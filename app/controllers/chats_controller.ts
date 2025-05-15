import type { HttpContext } from '@adonisjs/core/http'
import Chat from '#models/chat'
import { schema } from '@adonisjs/validator'

export default class ChatsController {
    // POST /chats
    public async store({ request, response }: HttpContext) {
        // const data = request.only(['user_id', 'messages'])

        const chatSchema = schema.create({
      user_id: schema.number(),
      messages: schema.array().members(
        schema.object().members({
          role: schema.string(),
          content: schema.string(),
        })
      ),
    })

    // ✅ 2. Validate the incoming request
    const data = await request.validate({ schema: chatSchema })
    
     // 💾 3. Store data
    const chat = await Chat.create({
        userId: data.user_id,
        messages: JSON.stringify(data.messages), // <- convert array to JSON string
    })       
        return response.created(chat)
    }

    // GET /chats
    public async index() {
        return await Chat.all()
    }

    // GET /chats/:id
    public async show({ params }: HttpContext) {
        const chat = await Chat.query()
            .where('id', params.id)
            .preload('user')
            .firstOrFail()
        return chat
    }

    // DELETE /chats:id
    public async destroy({ params, response }: HttpContext) {
        const chat  = await Chat.findOrFail(params.id)
        await chat.delete()
        return response.ok({ message: 'Chat deleted successfully' })
    }
}