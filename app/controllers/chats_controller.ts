import type { HttpContext } from '@adonisjs/core/http'
import Chat from '#models/chat'

export default class ChatsController {
    // POST /chats
    public async store({ request, response }: HttpContext) {
        const data = request.only(['user_id', 'messages'])
        const chat = await Chat.create(data)
        return response.created(chat)
    }

    // GET /chats
    public async index() {
        return await Chat.all()
    }

    // GET /chats/:id
    public async show({ params }: HttpContext) {
        return await Chat.find(params.id)
    }

    // DELETE /chats:id
    public async destroy({ params, response }: HttpContext) {
        const chat  = await Chat.findOrFail(params.id)
        await chat.delete()
        return response.ok({ message: 'Chat deleted successfully' })
    }
}