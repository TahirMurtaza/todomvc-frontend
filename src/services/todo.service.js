import { BaseService } from './base.service'

class TodoService extends BaseService {
  constructor() {
    super()
    this.baseUrl = '/todo'
  }

  async getTodos() {
    return this.get(this.baseUrl)
  }

  async getActiveTodos() {
    return this.get(`${this.baseUrl}/active`)
  }

  async getCompletedTodos() {
    return this.get(`${this.baseUrl}/completed`)
  }

  async createTodo({ title }) {
    return this.post(this.baseUrl, { title })
  }

  async updateTodo(id, updates) {
    return this.patch(`${this.baseUrl}/${id}`, updates)
  }

  async deleteTodo(id) {
    return this.delete(`${this.baseUrl}/${id}`)
  }

  async clearCompleted() {
    return this.delete(`${this.baseUrl}/clear-completed`)
  }
}

export default new TodoService()