import { Request, Response } from 'express'

const todoList = [
  {
    id: 1,
    name: 'Fazer compras',
    done: false
  },
  {
    id: 2,
    name: 'Fazer compras',
    done: false
  },
  {
    id: 3,
    name: 'Fazer compras',
    done: false
  }
]

export class TodosController {
  public getTodos = (req: Request, res: Response) => {
    res.json(todoList)
    res.end()
  }

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params
    const todo = todoList.find(todo => todo.id === Number(id))
    if (!todo) {
      res.status(400).json({ message: 'Todo not found' })
      res.end()
      return
    }

    res.json(todo)
    res.end()
  }

  public createTodo = (req: Request, res: Response) => {
    const { name, done } = req.body || {}

    if (!name || !done) {
      res.status(400).json({ message: 'Invalid body' })
      res.end()
    }

    todoList.push({ ...req.body, id: todoList.length + 1 })

    res.json(todoList)
    res.end()
  }

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req.params
    const todoNew = req.body || {}

    if (isNaN(Number(id))) {
      res.status(400).json({ message: 'Invalid id' })
      res.end()
      return
    }

    const todo = todoList.find(todo => todo.id === Number(id))
    if (!todo) {
      res.status(400).json({ message: 'Todo not found' })
      res.end()
      return
    }

    todo.name = todoNew.name || todo.name
    todo.done = todoNew.done || todo.done

    res.json(todoList)
    res.end()
  }
  public deleteById = (req: Request, res: Response) => {
    const { id } = req.params

    const todoIndex = todoList.findIndex(todo => todo.id === Number(id))

    if (todoIndex === -1) {
      res.status(400).json({ message: 'Todo not found' })
      return
    }

    todoList.splice(todoIndex, 1)

    res.json(todoList)
  }
}
