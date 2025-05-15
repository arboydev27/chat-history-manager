import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Chat from '#models/chat'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column ()
  declare name: string

  @column()
  declare email: string

  @hasMany(() => Chat)
  declare chats: HasMany<typeof Chat>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}